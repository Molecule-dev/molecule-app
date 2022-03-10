import React, { useState } from 'react'
import { useVersion } from './useVersion'
import * as types from './types'

export * as localState from './localState'
export * as types from './types'

export type StoreProps = {
  children: (store: types.Store) => React.ReactElement
}

/**
 * Provides application state as a composition of various stateful hooks.
 */
export const Store = ({ children }: StoreProps): React.ReactElement => {
  const [ status, setStatus ] = useState<types.Store['status']>(`ready`)
  const [ versionState, versionActions ] = useVersion()

  const store = React.useMemo<types.Store>(() => ({
    status,

    ...versionState,
    ...versionActions,
  }), [
    status,

    versionState,
    versionActions,
  ])

  return children(store)
}
