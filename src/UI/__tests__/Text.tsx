import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Text } from '../Text'

it('renders', () => {
  render(
    <App>
      <Text>
        Hello, World!
      </Text>
    </App>
  )

  // confirm render
  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})
