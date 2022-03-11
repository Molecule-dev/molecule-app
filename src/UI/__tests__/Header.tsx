import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Header } from '../Header'

it('renders', () => {
  render(
    <App>
      <Header>
        Hello, World!
      </Header>
    </App>
  )

  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})
