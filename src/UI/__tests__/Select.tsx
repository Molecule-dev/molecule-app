import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'
import { Select, SelectPlaceholder, SelectSelectedText } from '../Select'

it('renders', async () => {
  const onChange = jest.fn()

  render(
    <App>
      <Select
        placeholder='Hello, World!'
        value='Hello'
        onChange={onChange}
      >
        <option value='Hello'>
          Hello
        </option>

        <option value='World!'>
          World!
        </option>
      </Select>
    </App>
  )

  const select = screen.getByLabelText(`Hello, World!`)
  const placeholder = screen.getByText(`Hello, World!`, { selector: SelectPlaceholder.toString() })
  const input = screen.getByDisplayValue(`Hello`)
  const optionHello = screen.getByText(`Hello`, { selector: `option` })
  const optionWorld = screen.getByText(`World!`, { selector: `option` })
  const selectedText = screen.getByText(`Hello`, { selector: SelectSelectedText.toString() })

  // confirm select
  expect(select).toBeInTheDocument()

  // confirm placeholder
  expect(placeholder).toBeInTheDocument()

  // confirm value
  expect(input).toBeInTheDocument()

  // confirm options
  expect(optionHello).toBeInTheDocument()
  expect(optionWorld).toBeInTheDocument()

  // confirm selected text overlay
  expect(selectedText).toBeInTheDocument()

  // select an option
  userEvent.selectOptions(select, `World!`)

  // confirm value changed
  expect(screen.getByDisplayValue(`World!`)).toBeInTheDocument()
  expect(onChange).toHaveBeenCalled()

  // confirm selected text changed
  expect(screen.getByText(`World!`, { selector: SelectSelectedText.toString() })).toBeInTheDocument()
})
