import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Center } from '../Center'

it('renders', () => {
  render(
    <App>
      <Center>
        Hello, World!
      </Center>
    </App>
  )

  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})
