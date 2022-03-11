import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Input, InputPlaceholder } from '../Input'

it('renders', () => {
  render(
    <App>
      <Input
        placeholder='Hello'
        value='World!'
      />
    </App>
  )

  // confirm input
  expect(screen.getByLabelText(`Hello`)).toBeInTheDocument()

  // confirm placeholder
  expect(screen.getByText(`Hello`, { selector: InputPlaceholder.toString() })).toBeInTheDocument()

  // confirm value
  expect(screen.getByDisplayValue(`World!`)).toBeInTheDocument()
})

it('renders the normalized date-time inputs', () => {
  const value = new Date().toISOString()
  const [ date, time ] = value
    .replace(/Z$/, ``)
    .replace(/\.[0-9][0-9][0-9]$/, ``)
    .replace(/:[0-9][0-9]$/, `:00`)
    .split(`T`)

  render(
    <App>
      <Input
        type='datetime-local'
        placeholder='Hello, World!'
        value={value}
      />
    </App>
  )

  // confirm date input
  expect(screen.getByLabelText(`Hello, World! date`)).toBeInTheDocument()

  // confirm time input
  expect(screen.getByLabelText(`Hello, World! time`)).toBeInTheDocument()

  // confirm placeholder
  expect(screen.getByText(`Hello, World!`, { selector: InputPlaceholder.toString() })).toBeInTheDocument()

  // confirm date value
  expect(screen.getByDisplayValue(date)).toBeInTheDocument()

  // confirm time value
  expect(screen.getByDisplayValue(time)).toBeInTheDocument()
})
