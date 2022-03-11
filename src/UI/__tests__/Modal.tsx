import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from '../../App'
import { Modal, ModalButton, ModalUnderlay } from '../Modal'

it('renders', () => {
  render(
    <App>
      <Modal>
        Hello, World!
      </Modal>
    </App>
  )

  // confirm render
  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})

it('renders with close button and underlay when `onClose` handler is provided', () => {
  const onClose = jest.fn()

  render(
    <App>
      <Modal onClose={onClose}>
        Hello, World!
      </Modal>
    </App>
  )

  // confirm render
  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()

  const buttons = screen.getAllByTitle(`Close`)
  const closeButton = buttons.find(button => button.matches(ModalButton.toString()))
  const closeUnderlay = buttons.find(button => button.matches(ModalUnderlay.toString()))

  // confirm close button
  if (!closeButton) {
    throw new Error(`Close button not found.`)
  }

  // confirm close underlay
  if (!closeUnderlay) {
    throw new Error(`Close underlay not found.`)
  }

  // confirm close event
  fireEvent.click(closeButton)
  fireEvent.click(closeUnderlay)

  expect(onClose).toHaveBeenCalledTimes(2)
})
