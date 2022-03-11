import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { Store } from './Store/types'
import * as UI from '../UI'
import { themes } from '../themes'

export type ThemeTogglerProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * An icon which toggles the theme.
 */
export const ThemeToggler = styled(({ store, ...props }: ThemeTogglerProps) => {
  const availableThemes = Object.values<DefaultTheme>(themes)
  const { key, title, Icon } = store.theme
  const { setThemeKey } = store

  if (availableThemes.length <= 1) {
    return null
  }

  return (
    <div { ...props }>
      <UI.Button
        color='grayText'
        backgroundColor='transparent'
        title={`Theme: ${title}`}
        onClick={() => {
          const nextThemeIndex = availableThemes.findIndex(availableTheme => key === availableTheme.key) + 1
          const nextThemeKey = availableThemes[nextThemeIndex]
            ? availableThemes[nextThemeIndex].key
            : availableThemes[0].key

          setThemeKey(nextThemeKey)
        }}
      >
        <Icon size={20} aria-label={`Theme: ${title}`} />
      </UI.Button>
    </div>
  )
})`
  display: inline-block;

  > ${UI.Button} {
    width: 30px;
    padding: 0;

    &:hover {
      color: ${({ theme }) => theme.colors.strongText};
    }
  }
`
