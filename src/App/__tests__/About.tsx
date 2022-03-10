import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { About, AboutProps } from '../About'

it('renders', () => {
  render(
    <App>
      {(store: AboutProps['store']) => (
        <About store={store} />
      )}
    </App>
  )
})
