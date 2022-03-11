import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { StatusIcon } from '../StatusIcon'

it('renders pending status', () => {
  render(
    <App>
      <StatusIcon status='pending' />
    </App>
  )

  // confirm render
  expect(screen.getByTitle(`Pending`)).toBeInTheDocument()
  expect(screen.getByLabelText(`Pending`)).toBeInTheDocument()
})

it('renders resolved status', () => {
  render(
    <App>
      <StatusIcon status='resolved' />
    </App>
  )

  // confirm render
  expect(screen.getByTitle(`Resolved`)).toBeInTheDocument()
  expect(screen.getByLabelText(`Resolved`)).toBeInTheDocument()
})

it('renders rejected status', () => {
  render(
    <App>
      <StatusIcon status='rejected' />
    </App>
  )

  // confirm render
  expect(screen.getByTitle(`Rejected`)).toBeInTheDocument()
  expect(screen.getByLabelText(`Rejected`)).toBeInTheDocument()
})
