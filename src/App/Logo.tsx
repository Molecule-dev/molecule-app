import React from 'react'
import { ReactComponent as SVG } from './Logo.svg'

export type LogoProps = React.HTMLProps<HTMLSpanElement>

/**
 * The application logo.
 * 
 * You will probably want to customize this.
 */
export const Logo = ({ color = `primary`, ...props }: LogoProps) => (
  <span { ...props }>
    <SVG />
  </span>
)
