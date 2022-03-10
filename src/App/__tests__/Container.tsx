import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Container, ContainerProps } from '../Container'

it('renders', () => {
  render(
    <App>
      {(store: ContainerProps['store']) => (
        <Container store={store} />
      )}
    </App>
  )
})
