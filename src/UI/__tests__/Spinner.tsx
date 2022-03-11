import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Spinner } from '../Spinner'

it('renders', () => {
  render(
    <App>
      <Spinner title='Hello, World!' />
    </App>
  )

  // confirm render
  expect(screen.getByTitle(`Hello, World!`)).toBeInTheDocument()
  expect(screen.getByLabelText(`Hello, World!`)).toBeInTheDocument()
})
