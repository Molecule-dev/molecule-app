import { renderHook, act } from '@testing-library/react-hooks'
import { usePromise } from '../usePromise'

const RESOLVE_TIME = 50 // 50 milliseconds
const REJECT_TIME = 50  // 50 milliseconds
const CANCEL_TIME = 20  // 20 milliseconds

interface State {
  foo: string
  bar: string
}

it(`provides the state, resolved value, and rejected error of some promise with the ability to cancel and reset`, async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePromise((errorMessage?: string) => new Promise<State>((resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage))
      } else {
        resolve({
          foo: `Hello`,
          bar: `World!`
        })
      }
    }, REJECT_TIME)
  })))

  let state = result.current[0]
  const callAsyncFunction = result.current[1]

  // confirm initial state
  expect(state).toMatchObject({})

  // call async function
  act(() => {
    callAsyncFunction()
  })

  // confirm pending state
  state = result.current[0]
  expect(state.status).toBe(`pending`)
  expect(state.promise).toBeInstanceOf(Promise)
  expect(state.value).toBeUndefined()
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeInstanceOf(Function)
  expect(state.reset).toBeInstanceOf(Function)

  await waitForNextUpdate()

  // confirm resolved state
  state = result.current[0]
  expect(state.status).toBe(`resolved`)
  expect(state.promise).toBeUndefined()
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)

  // call async function with rejection
  act(() => {
    callAsyncFunction(`Rejected.`)
  })

  // confirm pending state
  state = result.current[0]
  expect(state.status).toBe(`pending`)
  expect(state.promise).toBeInstanceOf(Promise)
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeInstanceOf(Function)
  expect(state.reset).toBeInstanceOf(Function)

  await waitForNextUpdate()

  // confirm rejected state
  state = result.current[0]
  expect(state.status).toBe(`rejected`)
  expect(state.promise).toBeUndefined()
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeInstanceOf(Error)
  expect(state.error?.message).toBe(`Rejected.`)
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)

  // call async function which shouldn't resolve due to cancellation
  act(() => {
    callAsyncFunction()
  })

  // confirm pending state
  state = result.current[0]
  expect(state.status).toBe(`pending`)
  expect(state.promise).toBeInstanceOf(Promise)
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeInstanceOf(Function)
  expect(state.reset).toBeInstanceOf(Function)

  // cancel the promise
  await new Promise<void>(resolve => {
    setTimeout(() => {
      act(() => {
        state.cancel?.(`Cancelled.`)
      })

      resolve()
    }, CANCEL_TIME)
  })

  // wait a bit longer for the promise to resolve (nothing should happen)
  await new Promise<void>(resolve => setTimeout(resolve, RESOLVE_TIME))

  // confirm cancelled state
  state = result.current[0]
  expect(state.status).toBe(`rejected`)
  expect(state.promise).toBeUndefined()
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeInstanceOf(Error)
  expect(state.error?.message).toBe(`Cancelled.`)
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)

  // reset the error state using a single key
  act(() => {
    state.reset(`error`)
  })

  // confirm error was reset
  state = result.current[0]
  expect(state.status).toBe(`rejected`)
  expect(state.promise).toBeUndefined()
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)

  // reset the status state using an array
  act(() => {
    state.reset([`status`])
  })

  // confirm status was reset
  state = result.current[0]
  expect(state.status).toBeUndefined()
  expect(state.promise).toBeUndefined()
  expect(state.value).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)

  // reset the entire state
  act(() => {
    state.reset()
  })

  // confirm the entire state was reset
  state = result.current[0]
  expect(state.status).toBeUndefined()
  expect(state.promise).toBeUndefined()
  expect(state.value).toBeUndefined()
  expect(state.error).toBeUndefined()
  expect(state.cancel).toBeUndefined()
  expect(state.reset).toBeInstanceOf(Function)
})

it(`initializes the state with a predefined status and value`, async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePromise((errorMessage?: string) => new Promise<State>((resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage))
      } else {
        resolve({
          foo: `Hello`,
          bar: `World!`
        })
      }
    }, REJECT_TIME)
  }), {
    status: `resolved`,
    value: {
      foo: `foo`,
      bar: `bar`
    }
  }))

  const state = result.current[0]

  // confirm initial state
  expect(state).toMatchObject({
    status: `resolved`,
    value: {
      foo: `foo`,
      bar: `bar`
    }
  })
})
