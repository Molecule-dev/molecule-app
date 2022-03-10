import React from 'react'
import { VersionUpdateFooter } from './VersionUpdateFooter'
import { Store } from './Store/types'

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * The main generic element containing the application.
 */
export const Container = ({ store, title = `Molecule`, children, ...props }: ContainerProps) => {
  React.useEffect(() => {
    document.title = title
  }, [ title ])

  return (
    <main { ...props }>
      <div>
        {children}
      </div>

      <VersionUpdateFooter store={store} />
    </main>
  )
}
