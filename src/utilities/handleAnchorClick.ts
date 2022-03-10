import React from 'react'

const shouldOpenExternally = Boolean(process.env.REACT_APP_PLATFORM)

/**
 * External links clicked within native apps should be opened within the device's default browser.
 */
export const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>): boolean | void => {
  const currentTarget = event.currentTarget
  const href = currentTarget.getAttribute(`href`)

  if (shouldOpenExternally && href) {
    window.open(href, `_system`)
    event.preventDefault()
    return false
  }
}
