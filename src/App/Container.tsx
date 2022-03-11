import React from 'react'
import styled from 'styled-components'
import { VersionUpdateFooter } from './VersionUpdateFooter'
import { Store } from './Store/types'

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * The main generic element containing the application.
 */
export const Container = styled(({ store, title = `Molecule`, children, ...props }: ContainerProps) => {
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
})`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 55px 15px;
  padding-top: ${({ theme }) => theme.topPadding + 55}px;

  > div {
    width: 100%;
    margin: 0 auto;
  }
`
