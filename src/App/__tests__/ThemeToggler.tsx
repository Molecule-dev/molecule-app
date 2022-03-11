import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { App } from '../../App'
import { ThemeToggler, ThemeTogglerProps } from '../ThemeToggler'

it('renders', () => {
  render(
    <App>
      {(store: ThemeTogglerProps['store']) => (
        <ThemeToggler store={store} />
      )}
    </App>
  )

  const button = screen.getByRole(`button`)
  const initialTitle = button.title

  // confirm button
  expect(button).toBeInTheDocument()

  // click button
  fireEvent.click(button)

  // confirm theme toggled
  expect(screen.getByRole(`button`).title).not.toBe(initialTitle)
})
