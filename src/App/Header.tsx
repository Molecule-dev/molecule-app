import React from 'react'
import { Logo } from './Logo'
import { Store } from './Store/types'

export type AppNameProps = React.HTMLProps<HTMLSpanElement>

/**
 * The name of the application shown at the top left.
 *
 * You will probably want to customize this.
 */
export const AppName = (props: AppNameProps) => (
  <span { ...props }>
    Molecule
  </span>
)

export type AppLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  store: Store
  ref?: React.Ref<HTMLAnchorElement>
}

/**
 * A link to the root of the application.
 */
export const AppLink = ({ store, onClick, children, ...props }: AppLinkProps) => (
  <a href={process.env.REACT_APP_ID ? `index.html` : `https://www.molecule.dev`} { ...props }>
    {children}
  </a>
)

export type AsideProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

export type HeaderProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * The fixed header at the top of the application.
 */
export const Header = ({ store, ...props }: HeaderProps) => (
  <header { ...props }>
    <div>
      <AppLink store={store}>
        <Logo />
        <AppName />
      </AppLink>
    </div>
  </header>
)
