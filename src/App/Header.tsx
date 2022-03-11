import React from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { Store } from './Store/types'
import { ThemeToggler } from './ThemeToggler'
import * as UI from '../UI'

export type AppNameProps = React.HTMLProps<HTMLSpanElement>

/**
 * The name of the application shown at the top left.
 *
 * You will probably want to customize this.
 */
export const AppName = styled((props: AppNameProps) => (
  <span { ...props }>
    Molecule
  </span>
))`
  text-transform: lowercase;
`

export type AppLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  store: Store
  ref?: React.Ref<HTMLAnchorElement>
}

/**
 * A link to the root of the application.
 */
export const AppLink = styled(({ store, onClick, children, ...props }: AppLinkProps) => (
  <a href={process.env.REACT_APP_ID ? `index.html` : `https://www.molecule.dev`} { ...props }>
    {children}
  </a>
))`
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100vw - 120px);
  border: 0;
  padding: 0 5px 0 0;
  margin: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
  line-height: 26px;
  letter-spacing: -1px;
  white-space: nowrap;
  overflow: visible;
  cursor: pointer;

  > * {
    display: inline-block;
    vertical-align: middle;
  }
`

export type AsideProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * Menu icons at the top right.
 */
export const Aside = styled(({ store, ...props }: AsideProps) => (
  <aside { ...props }>
    <ThemeToggler store={store} />
  </aside>
))`
  position: relative;
  z-index: 10;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  height: 30px;

  > * {
    display: inline-flex;
    vertical-align: top;
  }
`

export type HeaderProps = Parameters<typeof UI.Header>[0] & {
  store: Store
}

/**
 * The fixed header at the top of the application.
 */
export const Header = styled(({ store, ...props }: HeaderProps) => (
  <UI.Header { ...props }>
    <div>
      <AppLink store={store}>
        <Logo />
        <AppName />
      </AppLink>

      <Aside store={store} />
    </div>
  </UI.Header>
))`
  position: fixed;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.05);

  > div {
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: space-between;
    width: 1280px;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;

    > ${AppLink} {
      > ${Logo} {
        margin-right: 5px;
      }
    }
  }
`
