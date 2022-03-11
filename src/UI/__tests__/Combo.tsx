import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from '../../App'
import { Combo, ComboPlaceholder } from '../Combo'

it('renders, selects option, and changes value', async () => {
  const onChange = jest.fn()

  render(
    <App>
      <Combo
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
      </Combo>
    </App>
  )

  const placeholder = screen.getByText(`Hello, World!`, { selector: ComboPlaceholder.toString() })
  const input = screen.getByDisplayValue(`Hello`)
  const optionHello = screen.getByText(`Hello`, { selector: `option` })
  const optionWorld = screen.getByText(`World!`, { selector: `option` })

  // confirm placeholder
  expect(placeholder).toBeInTheDocument()

  // confirm value
  expect(input).toBeInTheDocument()

  // confirm options
  expect(optionHello).toBeInTheDocument()
  expect(optionWorld).toBeInTheDocument()

  // select an option
  fireEvent.mouseDown(optionWorld)
  await screen.findByDisplayValue(`World!`)

  // confirm value changed
  expect(screen.getByDisplayValue(`World!`)).toBeInTheDocument()
  expect(onChange).toHaveBeenCalled()
})
