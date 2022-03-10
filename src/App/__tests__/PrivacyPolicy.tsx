import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { PrivacyPolicy, PrivacyPolicyProps } from '../PrivacyPolicy'

it('renders', () => {
  render(
    <App>
      <PrivacyPolicy />
    </App>
  )
})
