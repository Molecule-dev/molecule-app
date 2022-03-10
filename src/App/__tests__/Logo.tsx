import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Logo, LogoProps } from '../Logo'

it('renders', () => {
  render(
    <App>
      <Logo />
    </App>
  )
})
