import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Button } from '../Button'

it('renders', () => {
  render(
    <App>
      <Button>
        <span>
          Hello, World!
        </span>
      </Button>
    </App>
  )

  expect(screen.getByText(`Hello, World!`)).toBeInTheDocument()
})
