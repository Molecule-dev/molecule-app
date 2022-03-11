/**
 * A map of theme keys to every available theme as the `styled-components` `DefaultTheme` interface.
 * 
 * @module
 */

import 'styled-components'
import { Icon } from '@primer/octicons-react'
import { dark } from './dark'
import { light } from './light'

/**
 * Every available theme.
 */
export const themes = {
  dark,
  light,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    key: keyof typeof themes
    title: string
    Icon: Icon
    colors: {
      text: string
      grayText: string
      strongText: string
      background: string
      layerBackground: string
      layerText: string
      inputBackground: string
      primary: string
      red: string
      green: string
      blue: string
      yellow: string
      orange: string
      brown: string
      gray: string
      highlight: string
      animateGradientBackground: string
      animateGradient: string
      scrollGradient: string
    }
    /**
     * The same breakpoints used within (Chromium-based) DevTools.
     */
    breakpoints: {
      mobileS: {
        width: string
      }
      mobileM: {
        width: string
      }
      mobileL: {
        width: string
      }
      tablet: {
        width: string
      }
      laptop: {
        width: string
      }
      laptopL: {
        width: string
      }
      fourK: {
        width: string
      }
    }
    /**
     * Some versions of the app need extra top padding for e.g. native menus and/or notches.
     */
    topPadding: number
  }
}
