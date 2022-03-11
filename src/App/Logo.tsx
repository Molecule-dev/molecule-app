import React from 'react'
import styled from 'styled-components'
import { ReactComponent as SVG } from './Logo.svg'

export type LogoProps = React.HTMLProps<HTMLSpanElement>

/**
 * The application logo.
 * 
 * You will probably want to customize this.
 */
export const Logo = styled(({ color = `primary`, ...props }: LogoProps) => (
  <span { ...props }>
    <SVG />
  </span>
))`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  color: ${({ theme, color = `primary` }) => theme.colors[color as keyof typeof theme.colors] || color};
  
  > svg {
    display: inline-block;
    width: 100%;
    height: 100%;
    transition: transform 0.25s ease-in-out;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
