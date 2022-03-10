import React, { useEffect, useState } from 'react'
import { Store } from './Store/types'
import { logger } from '../logger'

const UPDATE_TIME_LIMIT = 5000 // 5 seconds

export type VersionUpdateFooterProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * A footer with a button to update the app which will be shown whenever there is a version update.
 * 
 * Shown when a service worker update is ready or when the `version.json` static file has changed.
 */
export const VersionUpdateFooter = ({ store, ...props }: VersionUpdateFooterProps) => {
  const [ isUpdating, setIsUpdating ] = useState(false)

  // If for some reason an update hangs, reload the page.
  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null

    if (isUpdating) {
      timeout = setTimeout(() => {
        window.location.reload()
      }, UPDATE_TIME_LIMIT)
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [ isUpdating ])

  if (!store.newVersionAvailable && !store.newServiceWorkerAvailable) {
    // Render nothing since there isn't a new version available.
    return null
  }

  if (isUpdating) {
    return (
      <div style={{ position: `fixed`, top: 0, bottom: 0, left: 0, right: 0, width: `100%`, height: `100%`, background: `white` }}>
        Updating...
      </div>
    )
  }

  const update = async () => {
    try {
      setIsUpdating(true)
      store.updateServiceWorker()

      if (navigator.serviceWorker?.ready) {
        const serviceWorkerRegistration = await navigator.serviceWorker?.ready
        await serviceWorkerRegistration.update()
      } else {
        window.location.reload()
      }
    } catch (error) {
      logger.error(error)
      setIsUpdating(false)
      window.location.reload()
    }
  }

  return (
    <footer { ...props }>
      <span>
        New version available!
      </span>

      <button onClick={update}>
        <span>
          Update
        </span>
      </button>
    </footer>
  )
}
