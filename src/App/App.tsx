import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Store } from './Store'
import * as Layouts from './Layouts'

export type AppProps = {
  /**
   * The router can be replaced with the provided `children`,
   * which can be useful for e.g. testing where the store and/or theme are needed.
   */
  children?: React.ReactNode
}

/**
 * The root of the application, beginning with the store, theme, then routes.
 */
export const App = ({ children }: AppProps): React.ReactElement => (
  <Store>
    {store => (
      <HashRouter>
        {children ? typeof children === `function` ? children(store) : children : (
          <Routes>
            <Route
              path='/'
              element={
                <Layouts.Default store={store} />
              }
            />

            <Route
              element={
                <div>
                  <h1>
                    Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        )}
      </HashRouter>
    )}
  </Store>
)
