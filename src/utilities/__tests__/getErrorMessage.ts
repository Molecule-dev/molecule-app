import { getErrorMessage } from '../getErrorMessage'

it(`returns a better "timed out" message`, () => {
  expect(getErrorMessage({ code: `ETIMEDOUT` })).toBe(`Timed out`)
})

it(`returns a better "connection aborted" message`, () => {
  expect(getErrorMessage({ code: `ECONNABORTED` })).toBe(`Connection aborted`)
})

it(`returns response data's error message`, () => {
  expect(getErrorMessage({
    response: {
      data: {
        error: `Username is required.`
      }
    }
  })).toBe(`Username is required.`)
})

it(`returns error message`, () => {
  expect(getErrorMessage(new Error(`Unexpected token`))).toBe(`Unexpected token`)
})

it(`returns the error if already a string`, () => {
  expect(getErrorMessage(`Unexpected token`)).toBe(`Unexpected token`)
})

it(`returns null if no error`, () => {
  expect(getErrorMessage()).toBe(null)
  expect(getErrorMessage(null)).toBe(null)
})
