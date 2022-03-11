import { useState, useMemo, Dispatch, SetStateAction } from 'react'
import { DefaultTheme } from 'styled-components'
import { themes } from '../../themes'

const defaultTheme = Object.values(themes)[0] as DefaultTheme
const storageKey = `selectedThemeKey`

/**
 * Every available theme key.
 */
export type ThemeKey = keyof typeof themes

/**
 * Saves the theme key as `selectedThemeKey` using `localStorage` and sets the state to the theme object.
 */
export type SetThemeKey = (themeKey: ThemeKey) => void

/**
 * Explicitly sets the theme.
 */
export type SetTheme = Dispatch<SetStateAction<DefaultTheme>>

/**
 * Gets the selected theme key from local storage and returns the selected theme object.
 */
export const getSelectedTheme = (): DefaultTheme => {
  const selectedThemeKey = window.localStorage.getItem(storageKey) as ThemeKey

  if (themes[selectedThemeKey]) {
    return themes[selectedThemeKey]
  }

  return defaultTheme
}

/**
 * If the user's preferred theme does not match the prerendered default theme,
 * the app's HTML will need to be reset instead of hydrating the existing HTML.
 */
export const shouldResetInitialRender = (): boolean => getSelectedTheme() !== defaultTheme

/**
 * A hook which returns the current theme and a method to set the theme by key.
 */
export const useTheme = (initialTheme: DefaultTheme = getSelectedTheme()): [ DefaultTheme, SetThemeKey, SetTheme ] => {
  const [ theme, setTheme ] = useState<DefaultTheme>(initialTheme)

  const setThemeKey = useMemo<SetThemeKey>(() => themeKey => {
    window.localStorage.setItem(storageKey, themeKey)
    setTheme(themes[themeKey])
  }, [])

  return [ theme, setThemeKey, setTheme ]
}
