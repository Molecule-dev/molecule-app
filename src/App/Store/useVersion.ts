import { useMemo, useEffect } from 'react'
import axios from 'axios'
import { useAsyncExtendedState } from '../../hooks/useAsyncExtendedState'
import { register, unregister } from '../../serviceWorkerRegistration'
import { logger } from '../../logger'

const isReactSnap = navigator.userAgent === `ReactSnap`

const CHECK_VERSION_EVERY = 1000 * 60 * 5 // 5 minutes

/**
 * Build and version information.
 */
export interface VersionInfo {
  /**
   * The app's current build ID, usually a `BUILD_ID` environment variable
   * set by the deployment platform when building the app.
   */
  buildId: string
  /**
   * The app's current version number.
   */
  version: string
}

/**
 * Version state.
 */
export interface VersionState extends VersionInfo {
  /**
   * The app's new build ID, detected via `version.json`.
   */
  newBuildId: VersionInfo['buildId']
  /**
   * The app's new version number, detected via `version.json`.
   */
  newVersion: VersionInfo['version']
  /**
   * This is set to `true` when a new build or version was detected via `version.json`.
   */
  newVersionAvailable: boolean
  /** 
   * This is set to `true` when the service worker has been updated and is waiting.
   */
  newServiceWorkerAvailable: boolean
  /**
   * The waiting service worker when updated.
   */
  waitingServiceWorker: null | ServiceWorker
  /**
   * Used for checking the version every 15 minutes.
   */
  doVersionCheck: boolean
}

/**
 * Version actions.
 */
export interface VersionActions {
  /**
   * Updates the service worker.
   */
  updateServiceWorker: () => void
}

/**
 * Sends a message to the service worker indicating that the window is now focused.
 */
export const onWindowFocus = (): void => {
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({ type: `WINDOW_FOCUSED` })
  }
}

/**
 * If a service worker update is somehow triggered before the update is actually ready,
 * we set this to true to let the service worker know it should update as soon as it's ready.
 */
let skipWaitingOnUpdate = false

/**
 * A hook which returns an object describing the current and potentially new version state
 * and a method to update the service worker, if applicable.
 * 
 * Polls `version.json` every 15 minutes.
 */
export const useVersion = (): [ VersionState, VersionActions ] => {
  const [ versionState,, extendVersionState ] = useAsyncExtendedState<VersionState>({
    buildId: ``,
    version: process.env.REACT_APP_VERSION || ``,
    newBuildId: ``,
    newVersion: ``,
    newVersionAvailable: false,
    newServiceWorkerAvailable: false,
    waitingServiceWorker: null,
    doVersionCheck: !process.env.REACT_APP_PLATFORM && process.env.NODE_ENV !== `test`
  })

  // Poll the `version.json` static file.
  useEffect(() => {
    let checkVersionTimeout: null | NodeJS.Timeout = null

    const checkVersion = async () => {
      try {
        const response = await axios.get<VersionInfo>(`version.json`)

        if (response.data?.buildId && response.data.buildId !== versionState.buildId) {
          if (versionState.buildId) {
            // New version detected.
            extendVersionState({ newBuildId: response.data.buildId, newVersionAvailable: true })
          } else {
            // This is the first fetch. Set the `buildId` for later comparison.
            extendVersionState({ buildId: response.data.buildId })
          }
        }

        // Checking `buildId` above is sufficient, but let's keep track of the `version` too.
        if (response.data?.version && response.data.version !== versionState.version) {
          if (versionState.version) {
            // New version detected.
            extendVersionState({ newVersion: response.data.version, newVersionAvailable: true })
          } else {
            // This is the first fetch. Set the `version` for later comparison.
            extendVersionState({ version: response.data.version })
          }
        }
      } catch (error) {
        logger.error(error)
      }

      checkVersionTimeout = setTimeout(() => extendVersionState({ doVersionCheck: true }), CHECK_VERSION_EVERY)
    }

    if (versionState.doVersionCheck) {
      extendVersionState({ doVersionCheck: false })
      checkVersion()
    }

    return () => {
      if (checkVersionTimeout !== null) {
        clearTimeout(checkVersionTimeout)
      }
    }
  }, [ versionState.doVersionCheck, versionState.buildId, versionState.version, extendVersionState ])

  const updateServiceWorker = useMemo(() => () => {
    if (versionState.waitingServiceWorker) {
      versionState.waitingServiceWorker.postMessage({ type: `SKIP_WAITING` })
    } else {
      skipWaitingOnUpdate = true
    }
  }, [ versionState.waitingServiceWorker ])

  // Add the window focus event listener and register the service worker.
  useEffect(() => {
    if (!isReactSnap && navigator.serviceWorker?.ready) {
      navigator.serviceWorker.ready.then(() => {
        window.addEventListener(`focus`, onWindowFocus)
      })

      register({
        onUpdate: serviceWorkerRegistration => {
          if (skipWaitingOnUpdate && serviceWorkerRegistration.waiting) {
            serviceWorkerRegistration.waiting.postMessage({ type: `SKIP_WAITING` })
          }

          extendVersionState({
            waitingServiceWorker: serviceWorkerRegistration.waiting,
            newServiceWorkerAvailable: true
          })
        }
      })
    }

    return () => {
      if (!isReactSnap && navigator.serviceWorker?.ready) {
        unregister()
        window.removeEventListener(`focus`, onWindowFocus)
      }
    }
  }, [ extendVersionState ])

  // If there are multiple tabs open, ensure each one is updated with a new service worker is activated.
  useEffect(() => {
    if (versionState.waitingServiceWorker) {
      versionState.waitingServiceWorker.addEventListener(`statechange`, () => {
        if (versionState.waitingServiceWorker?.state === `activated`) {
          window.location.reload()
        }
      })
    }
  }, [ versionState.waitingServiceWorker ])

  const versionActions = useMemo<VersionActions>(() => ({
    updateServiceWorker
  }), [
    updateServiceWorker
  ])

  return [ versionState, versionActions ]
}
