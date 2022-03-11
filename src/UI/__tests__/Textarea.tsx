import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Textarea, TextareaPlaceholder } from '../Textarea'

it('renders', () => {
  render(
    <App>
      <Textarea
        placeholder='Hello'
        value='World!'
      />
    </App>
  )

  // confirm textarea
  expect(screen.getByLabelText(`Hello`)).toBeInTheDocument()

  // confirm placeholder
  expect(screen.getByText(`Hello`, { selector: TextareaPlaceholder.toString() })).toBeInTheDocument()

  // confirm value
  expect(screen.getByDisplayValue(`World!`)).toBeInTheDocument()
})
