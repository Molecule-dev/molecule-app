import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { VersionUpdateFooter, VersionUpdateFooterProps } from '../VersionUpdateFooter'

it('renders', () => {
  render(
    <App>
      {(store: VersionUpdateFooterProps['store']) => (
        <VersionUpdateFooter store={store} />
      )}
    </App>
  )
})
