import React from 'react'
import { Container } from '../Container'
import { Header } from '../Header'
import { Store } from '../Store/types'
import * as UI from '../../UI'

const isReactSnap = navigator.userAgent === `ReactSnap`

export type DefaultProps = Parameters<typeof Container>[0] & {
  store: Store
  match?: { params: JSONObject }
}

/**
 * The default layout.
 * 
 * When store is initializing, renders a `Spinner` instead of its `children`,
 * or if not logged in, renders the `LogIn` component.
 */
export const Default = ({ store, match, children, ...props }: DefaultProps): React.ReactElement => (
  <Container store={store} title='Molecule' { ...props }>
    <Header store={store} { ...match?.params } />

    {(store.status === `initializing` || isReactSnap) ? (
      <UI.Center>
        <UI.Spinner />
      </UI.Center>
    ) : children}
  </Container>
)
