import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Store } from './Store/types'
import { logger } from '../logger'
import * as UI from '../UI'

const UPDATE_TIME_LIMIT = 5000 // 5 seconds

export type VersionUpdateFooterProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * A footer with a button to update the app which will be shown whenever there is a version update.
 * 
 * Shown when a service worker update is ready or when the `version.json` static file has changed.
 */
export const VersionUpdateFooter = styled(({ store, ...props }: VersionUpdateFooterProps) => {
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
      <UI.Modal backgroundColor='transparent'>
        <UI.ModalUnderlay title='Updating...' />
        <UI.Spinner title='Updating...' />
      </UI.Modal>
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

      <UI.Button backgroundColor='green' onClick={update}>
        <span>
          Update
        </span>
      </UI.Button>
    </footer>
  )
})`
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 55px;
  padding: 10px;
  text-align: center;
  background: ${({ theme }) => theme.colors.layerBackground};
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.05);

  > span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 18px;
    line-height: 35px;
  }
`
