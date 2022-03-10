import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Header, HeaderProps } from '../Header'

it('renders', () => {
  render(
    <App>
      {(store: HeaderProps['store']) => (
        <Header store={store} />
      )}
    </App>
  )
})
