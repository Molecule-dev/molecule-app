import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { shouldResetInitialRender } from './App/Store/useTheme'

export * as API from './API'
export * as App from './App'
export * as hooks from './hooks'
export * as themes from './themes'
export * as UI from './UI'
export * as utilities from './utilities'

export * from './reportWebVitals'
export * as serviceWorkerRegistration from './serviceWorkerRegistration'

export * as types from './types' // @ts-only

let isInitialRender = true

/**
 * Renders the React app within the `#root` element.
 */
export const render = (reset?: boolean): void => {
  const rootElement = document.getElementById('root')

  if (isInitialRender) {
    isInitialRender = false

    if (!reset) {
      reset = shouldResetInitialRender()
    }
  }

  if (rootElement) {
    if (reset) {
      rootElement.innerHTML = ``
      ReactDOM.render(<App />, rootElement)
    } else if (rootElement.hasChildNodes()) {
      ReactDOM.hydrate(<App />, rootElement)
    } else {
      ReactDOM.render(<App />, rootElement)
    }
  }
}

render()
