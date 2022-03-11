import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from '../../App'
import { RTE, RTEPlaceholder } from '../RTE'

it('renders with formatting options', () => {
  render(
    <App>
      <RTE
        placeholder='Hello'
        value={{ html: `<p>World!</p>`, text: `World!` }}
      />
    </App>
  )

  // confirm RTE
  expect(screen.getByLabelText(`Hello`)).toBeInTheDocument()

  // confirm placeholder
  expect(screen.getByText(`Hello`, { selector: RTEPlaceholder.toString() })).toBeInTheDocument()

  // confirm value
  expect(screen.getByText(`World!`)).toBeInTheDocument()

  // confirm the initial number of formatting buttons
  expect(screen.getAllByRole(`button`).length).toBe(10)

  // click the "Show all formatting options" button
  fireEvent.click(screen.getByTitle(`Show all formatting options`))

  // confirm all formatting options are now displayed
  expect(screen.getAllByRole(`button`).length).toBe(21)
})
