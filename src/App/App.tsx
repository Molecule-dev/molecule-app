import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Store } from './Store'
import * as Layouts from './Layouts'
import * as UI from '../UI'

export type AppProps = {
  /**
   * The router can be replaced with the provided `children`,
   * which can be useful for e.g. testing where the store and/or theme are needed.
   */
  children?: React.ReactNode
}

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }
`

/**
 * The root of the application, beginning with the store, theme, then routes.
 */
export const App = ({ children }: AppProps): React.ReactElement => (
  <Store>
    {store => (
      <ThemeProvider theme={store.theme}>
        <GlobalStyle />

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
                  <UI.Error center={true}>
                    <h1>
                      Not Found
                    </h1>
                  </UI.Error>
                }
              />
            </Routes>
          )}
        </HashRouter>
      </ThemeProvider>
    )}
  </Store>
)
