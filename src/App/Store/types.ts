/**
 * Store type definitions.
 * 
 * @module
 */

import { DefaultTheme } from 'styled-components'
import { SetThemeKey, SetTheme } from './useTheme'
import { VersionState, VersionActions } from './useVersion'

/**
 * The shape of the store.
 */
export type Store = VersionState & VersionActions & {
  status: `initializing` | `ready`

  theme: DefaultTheme
  setThemeKey: SetThemeKey
  setTheme: SetTheme
}
