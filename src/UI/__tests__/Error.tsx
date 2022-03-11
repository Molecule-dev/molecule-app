import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Error } from '../Error'

it('renders error message', () => {
  render(
    <App>
      <Error>
        {new window.Error(`Hello, World!`)}
      </Error>
    </App>
  )

  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})

it('renders displays none when no error', () => {
  render(
    <App>
      <Error data-testid='error'>
        {null}
      </Error>
    </App>
  )

  const error = screen.getByTestId(`error`)

  // element should exist but...
  expect(error).toBeInTheDocument()

  // nothing should be rendered, meaning its `offsetParent` should be `null`
  // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  expect(error.offsetParent).toBe(null)
})
