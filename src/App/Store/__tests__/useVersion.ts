import { renderHook } from '@testing-library/react-hooks'
import { useVersion } from '../useVersion'
import { version } from '../../../../package.json'

it(`returns version state and a method to update the service worker`, async () => {
  const { result } = renderHook(() => useVersion())
  const [ versionState, versionActions ] = result.current

  // confirm shape
  expect(versionState).toMatchObject({
    buildId: ``,
    version,
    newBuildId: ``,
    newVersion: ``,
    newVersionAvailable: false,
    newServiceWorkerAvailable: false,
    waitingServiceWorker: null,
    doVersionCheck: false
  })

  expect(versionActions.updateServiceWorker).toBeInstanceOf(Function)
})
