import React from 'react'
import styled from 'styled-components'

export type FooterProps = React.HTMLProps<HTMLDivElement>

/**
 * A styled `footer` element.
 * 
 * This is a simple wrapper around the native `footer` element,
 * so you can replace `<footer { ...props } />` with `<UI.Footer { ...props } />`
 * for better looking, easily stylable footers for your application.
 * 
 * Example usage:
 * ```tsx
 * import React from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   return (
 *     <div { ...props }>
 *       <UI.Footer>
 *         <span>
 *           Hello, World!
 *         </span>
 *       </UI.Footer>
 *     </div>
 *   )
 * }
 * ```
 */
export const Footer = styled(({ role = `banner`, ...props }: FooterProps) => (
  <footer role={role} { ...props } />
))`
  z-index: 1001;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px;
  background: ${({ theme }) => theme.colors.layerBackground};
`
