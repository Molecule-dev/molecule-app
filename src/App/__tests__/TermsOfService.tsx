import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { TermsOfService, TermsOfServiceProps } from '../TermsOfService'

it('renders', () => {
  render(
    <App>
      <TermsOfService />
    </App>
  )
})
