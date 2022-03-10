import { renderHook, act } from '@testing-library/react-hooks'
import { useAsyncExtendedState } from '../useAsyncExtendedState'

const RESOLVE_TIME = 50 // 50 milliseconds
const REJECT_TIME = 50  // 50 milliseconds

interface State {
  foo: string
  bar: string
}

it(`sets and extends the state, synchronously and asynchronously with error handling`, async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAsyncExtendedState<State>({
    foo: `foo`,
    bar: `bar`
  }))

  let state = result.current[0]
  const setState = result.current[1]
  const extendState = result.current[2]

  // confirm initial state
  expect(state).toMatchObject({
    foo: `foo`,
    bar: `bar`
  })

  // set the state
  act(() => {
    setState({ foo: 'Hello', bar: 'World!' })
  })

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })

  // set the state as a function of previous state
  act(() => {
    setState(state => ({ foo: (state as State).foo.toUpperCase(), bar: (state as State).bar.toUpperCase() }))
  })

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `WORLD!`
  })

  // set the state asynchronously, throwing an error
  let rejectedAsyncSetState = false
  act(() => {
    setState(new Promise((resolve, reject) => setTimeout(() => {
      reject(new Error(`Rejected.`))
      rejectedAsyncSetState = true
    }, REJECT_TIME)))
  })

  // no update should occur since there was an error, wait until rejected
  await new Promise(resolve => setTimeout(resolve, REJECT_TIME + 10))

  // confirm async setState was rejected
  expect(rejectedAsyncSetState).toBe(true)

  // confirm the state was unchanged due to the error
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `WORLD!`
  })

  // set the state asynchronously
  act(() => {
    setState(new Promise(resolve => setTimeout(() => resolve({
      foo: `Async Hello`,
      bar: `Async World!`
    }), RESOLVE_TIME)))
  })

  await waitForNextUpdate()

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Async Hello`,
    bar: `Async World!`
  })

  // set the state asynchronously as a function of previous state
  act(() => {
    setState(new Promise(resolve => setTimeout(() => resolve(state => ({
      foo: (state as State).foo.toUpperCase(),
      bar: (state as State).bar.toUpperCase()
    })), RESOLVE_TIME)))
  })

  await waitForNextUpdate()

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `ASYNC HELLO`,
    bar: `ASYNC WORLD!`
  })

  // extend the state
  act(() => {
    extendState({ foo: 'Hello' })
  })

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Hello`,
    bar: `ASYNC WORLD!`
  })

  // extend the state as a function of previous state
  act(() => {
    extendState(state => ({ foo: (state as State).foo.toUpperCase() }))
  })

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `ASYNC WORLD!`
  })

  // extend the state asynchronously, throwing an error
  let rejectedAsyncExtendState = false
  act(() => {
    extendState(new Promise((resolve, reject) => setTimeout(() => {
      reject(new Error(`Rejected.`))
      rejectedAsyncExtendState = true
    }, REJECT_TIME)))
  })

  // no update should occur since there was an error, wait until rejected
  await new Promise(resolve => setTimeout(resolve, REJECT_TIME + 10))

  // confirm async extendState was rejected
  expect(rejectedAsyncExtendState).toBe(true)

  // confirm the state was left unchanged due to the error
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `ASYNC WORLD!`
  })

  // extend the state asynchronously
  act(() => {
    extendState(new Promise(resolve => setTimeout(() => resolve({
      foo: `Async Hello`
    }), RESOLVE_TIME)))
  })

  await waitForNextUpdate()

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Async Hello`,
    bar: `ASYNC WORLD!`
  })

  // extend the state asynchronously as a function of previous state
  act(() => {
    extendState(new Promise(resolve => setTimeout(() => resolve(state => ({
      foo: (state as State).foo.toUpperCase()
    })), RESOLVE_TIME)))
  })

  await waitForNextUpdate()

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `ASYNC HELLO`,
    bar: `ASYNC WORLD!`
  })
})
