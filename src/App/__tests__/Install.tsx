import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Install, InstallProps } from '../Install'

it('renders', () => {
  render(
    <App>
      <Install />
    </App>
  )
})
