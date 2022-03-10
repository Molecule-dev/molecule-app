/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef } from 'react'

export type PromiseStatus = `pending` | `resolved` | `rejected`
export type CancelPromise = (message?: string) => void
export type ResetPromiseState<T> = (keys?: keyof PromiseState<T> | Array<keyof PromiseState<T>>) => void

export interface PromiseState<T> {
  status?: PromiseStatus
  promise?: Promise<T>
  value?: Awaited<T>
  error?: Error
  cancel?: CancelPromise
}

export type PromiseStateWithReset<T> = PromiseState<T> & {
  reset: ResetPromiseState<T>
}

/**
 * A hook which accepts an asynchronous function (i.e., a function which returns a promise).
 * 
 * Returns a new asynchronous function wrapping the original to be called as necessary,
 * along with the state of the promise as `status`, `promise`, `value`, `error`, `cancel()`,
 * and a `reset()` method to reset the state.
 * 
 * Pairs well with the {@link hooks.useAsyncExtendedState | `useAsyncExtendedState`} hook.
 * 
 * Example:
 * ```ts
 * interface State {
 *   foo: string
 *   bar: string
 * }
 * 
 * const [ state, setState, extendState ] = useAsyncExtendedState<State>({
 *   foo: 'foo',
 *   bar: 'bar'
 * })
 * 
 * const read = (id: string) => API.client.get<Partial<State>>(`things/${id}`).then(response => {
 *   return response.data
 * })
 * 
 * const [ readThingRequest, readThing ] = usePromise(read)
 * 
 * const isPending = readThingRequest.status === 'pending'
 * 
 * return (
 *   <>
 *     <div>
 *       foo: {state.foo}
 *     </div>
 * 
 *     <div>
 *       bar: {state.bar}
 *     </div>
 * 
 *     <UI.Button onClick={() => extendState(readThing('someId'))} disabled={isPending}>
 *       <span>
 *         {isPending
 *           ? 'Reading thing...'
 *           : 'Read thing'
 *         }
 *       </span>
 *     </UI.Button>
 * 
 *     <UI.Error>
 *       {readThingRequest.error}
 *     </UI.Error>
 *   </>
 * )
 * ```
 */
export const usePromise = <T extends (...args: any[]) => any>(
  asyncFunction: T,
  initialState?: PromiseState<ReturnType<T>>
): [
  PromiseStateWithReset<ReturnType<T>>,
  (...asyncFuncArgs: Parameters<T>) => ReturnType<T>
] => {
  const [ state, setState ] = useState<PromiseState<ReturnType<T>>>(initialState || {})
  const isUnmounted = useRef(false)

  const callAsyncFunction = useMemo(() => (...args: Parameters<T>): ReturnType<T> => {
    const promise = asyncFunction(...args)

    let isCancelled = false
    const cancel: CancelPromise = message => {
      isCancelled = true

      if (!isUnmounted.current) {
        setState(({ value }) => ({
          status: `rejected`,
          value, error: message
            ? new Error(message)
            : undefined
        }))
      }
    }

    if (promise instanceof Promise) {
      return new Promise(resolve => {
        const fulfillPromise = async () => {
          try {
            const value: Awaited<ReturnType<T>> = await promise

            if (!isCancelled && !isUnmounted.current) {
              setState({
                status: `resolved`,
                value
              })

              resolve(value)
            }
          } catch (error) {
            if (!isCancelled && !isUnmounted.current) {
              setState(({ value }) => ({
                status: `rejected`,
                value,
                error: error instanceof Error
                  ? error
                  : new Error(error as string)
              }))
            }
          }
        }

        setState(({ value }) => ({
          status: `pending`,
          value,
          promise,
          cancel
        }))

        fulfillPromise()
      }) as ReturnType<T>
    } else {
      setState({
        status: `resolved`,
        value: promise
      })

      return promise
    }
  }, [ asyncFunction ])

  const reset = useMemo<ResetPromiseState<T>>(() => keys => setState(state => {
    if (!keys) {
      return {}
    }

    const nextState = { ...state }

    if (Array.isArray(keys)) {
      for (const key of keys) {
        delete nextState[key]
      }
    } else {
      delete nextState[keys]
    }

    return nextState
  }), [])

  const stateWithReset = useMemo<PromiseStateWithReset<ReturnType<T>>>(() => ({
    ...state,
    reset
  }), [
    state,
    reset
  ])

  useEffect(() => {
    return () => {
      isUnmounted.current = true
    }
  }, [])

  return [ stateWithReset, callAsyncFunction ]
}
