import { DefaultTheme } from 'styled-components'
import { darken } from 'polished'
import { SunIcon } from '@primer/octicons-react'
import { getTopPadding } from './utilities/getTopPadding'

/**
 * The light application theme.
 */
export const light: DefaultTheme = {
  key: `light`,
  title: `Light`,
  Icon: SunIcon,
  colors: {
    text: `#333333`,
    grayText: `#808080`,
    strongText: `#000000`,
    background: `#f6f6f6`,
    layerBackground: `#ffffff`,
    layerText: `#555555`,
    inputBackground: `#ffffff`,
    primary: `#4070e0`,
    red: `#d02000`,
    green: `#309000`,
    blue: `#4070e0`,
    yellow: `#e0e040`,
    orange: `#ff5722`,
    brown: `#bf5100`,
    gray: `#808080`,
    highlight: `#ffffa6`,
    animateGradientBackground: `linear-gradient(120deg, ${darken(0.25, `#4070e0`)}, ${darken(0.25, `#c28497`)} 40%, ${darken(0.25, `#b3855e`)} 50%, ${darken(0.25, `#c28497`)} 60%, ${darken(0.25, `#4070e0`)})`,
    animateGradient: `linear-gradient(120deg, ${darken(0.25, `#edc7a7`)}, ${darken(0.25, `#e4a6b9`)} 20%, ${darken(0.25, `#7ea5ff`)} 40%, ${darken(0.25, `#acc4fd`)}, ${darken(0.25, `#7ea5ff`)} 60%, ${darken(0.25, `#e4a6b9`)} 80%, ${darken(0.25, `#edc7a7`)})`,
    scrollGradient: `linear-gradient(120deg, ${darken(0.25, `#acc4fd`)}, ${darken(0.25, `#7ea5ff`)} 45%, ${darken(0.25, `#e4a6b9`)} 75%, ${darken(0.25, `#edc7a7`)})`
  },
  breakpoints: {
    mobileS: {
      width: `320px`
    },
    mobileM: {
      width: `375px`
    },
    mobileL: {
      width: `425px`
    },
    tablet: {
      width: `768px`
    },
    laptop: {
      width: `1024px`
    },
    laptopL: {
      width: `1440px`
    },
    fourK: {
      width: `2560px`
    }
  },
  topPadding: getTopPadding()
}
