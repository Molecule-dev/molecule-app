import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'

export type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'size'> & {
  type?: `button` | `reset` | `submit`
  color?: string
  backgroundColor?: string
  size?: `small` | `medium` | `large` | string | number
}

/**
 * A styled `button` element.
 * 
 * This is a simple wrapper around the native `button` element,
 * so you can replace `<button { ...props } />` with `<UI.Button { ...props } />`
 * for better looking, easily stylable buttons for your application.
 * 
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ count, setCount ] = useState(0)
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         The button was clicked {count} times.
 *       </p>
 * 
 *       <UI.Button onClick={() => setCount(count => count + 1)}>
 *         <span>
 *           Click me
 *         </span>
 *       </UI.Button>
 *     </div>
 *   )
 * }
 * ```
 */
export const Button = styled(({ backgroundColor, size = `medium`, type = `button`, ...props }: ButtonProps) => (
  <button type={type} { ...props } />
))`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin: 0;
  border: 0;
  border-radius: 3px;
  height: ${({ size = `medium` }) => ({
    small: `26px`,
    medium: `30px`,
    large: `40px`
  })[size] || `30px`};
  font-size: ${({ size = `medium` }) => ({
    small: `13px`,
    medium: `15px`,
    large: `18px`
  })[size] || `15px`};
  font-weight: normal;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme, color = `` }) => theme.colors[color as keyof typeof theme.colors] || color || `white`};
  cursor: pointer;

  ${({ theme, backgroundColor }) => backgroundColor === `animateGradientBackground` ? `
    background: ${theme.colors.primary};
    background-image: ${theme.colors.animateGradientBackground};
    background-size: 600% 600%;
    animation: AnimateGradient 15s ease-in-out infinite;

    &:hover {
      animation: AnimateGradient 5s ease-in-out infinite;
    }
  ` : `
    background: ${theme.colors[backgroundColor as keyof typeof theme.colors] || backgroundColor || theme.colors.primary};
    transition: background 0.25s ease-in-out, color 0.25s ease-in-out, opacity 0.25s ease-in-out;

    &:hover {
      background: ${backgroundColor === `transparent` ? backgroundColor : mix(0.75, theme.colors[backgroundColor as keyof typeof theme.colors] || backgroundColor || theme.colors.primary, `rgba(31, 31, 31, 1)`)};
    }

    &:active {
      background: ${backgroundColor === `transparent` ? backgroundColor : mix(0.75, theme.colors[backgroundColor as keyof typeof theme.colors] || backgroundColor || theme.colors.primary, `rgba(0, 0, 0, 1)`)};
    }
  `}

  > * {
    display: inline-block;
    vertical-align: middle;
    margin: 0 2.5px;
  }
`
