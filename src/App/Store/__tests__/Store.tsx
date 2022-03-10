import React from 'react'
import { render } from '@testing-library/react'
import { Store } from '../Store'
import * as types from '../types'
import { version } from '../../../../package.json'

it('renders', () => {
  const storeRef: { current: null | types.Store } = { current: null }

  render(
    <Store>
      {store => {
        storeRef.current = store

        return (
          <div />
        )
      }}
    </Store>
  )

  const store = storeRef.current as types.Store

  // confirm store shape
  expect(store.status).toBe(`ready`)
  expect(store.buildId).toBe(``)
  expect(store.version).toBe(version)
  expect(store.newBuildId).toBe(``)
  expect(store.newVersion).toBe(``)
  expect(store.newVersionAvailable).toBe(false)
  expect(store.newServiceWorkerAvailable).toBe(false)
  expect(store.waitingServiceWorker).toBe(null)
  expect(store.doVersionCheck).toBe(false)
  expect(store.updateServiceWorker).toBeInstanceOf(Function)
})
