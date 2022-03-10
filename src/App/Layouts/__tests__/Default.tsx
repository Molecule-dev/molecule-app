import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Default, DefaultProps } from '../Default'

it('renders', () => {
  render(
    <App>
      {(store: DefaultProps['store']) => (
        <Default store={store} />
      )}
    </App>
  )
})
