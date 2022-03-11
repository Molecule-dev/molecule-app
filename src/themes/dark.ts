import { DefaultTheme } from 'styled-components'
import { MoonIcon } from '@primer/octicons-react'
import { getTopPadding } from './utilities/getTopPadding'

/**
 * The dark application theme.
 */
export const dark: DefaultTheme = {
  key: `dark`,
  title: `Dark`,
  Icon: MoonIcon,
  colors: {
    text: `#e0e0e0`,
    grayText: `#aaaaaa`,
    strongText: `#ffffff`,
    background: `#222222`,
    layerBackground: `#292929`,
    layerText: `#bebebe`,
    inputBackground: `#191919`,
    primary: `#4070e0`,
    red: `#d02000`,
    green: `#309000`,
    blue: `#4070e0`,
    yellow: `#e0e040`,
    orange: `#ff5722`,
    brown: `#bf5100`,
    gray: `#808080`,
    highlight: `#3e3e00`,
    animateGradientBackground: `linear-gradient(120deg, #4070e0, #c28497 40%, #b3855e 50%, #c28497 60%, #4070e0)`,
    animateGradient: `linear-gradient(120deg, #edc7a7, #e4a6b9 20%, #7ea5ff 40%, #acc4fd, #7ea5ff 60%, #e4a6b9 80%, #edc7a7)`,
    scrollGradient: `linear-gradient(120deg, #acc4fd, #7ea5ff 45%, #e4a6b9 75%, #edc7a7)`
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
