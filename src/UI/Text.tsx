import styled from 'styled-components'

/**
 * A styled `span` element to quickly color some text using the current `theme`.
 * 
 * This is a simple wrapper around the native `span` element,
 * so you can replace `<span { ...props } />` with `<UI.Text color='primary' { ...props } />`
 * for better looking, easily stylable inline text for your application.
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
 *       Hello, <UI.Text color='primary'>World</UI.Text>!
 *     </div>
 *   )
 * }
 */
export const Text = styled.span<{ color?: string }>`
  color: ${({ theme, color = `` }) => theme.colors[color as keyof typeof theme.colors] || color || `inherit`};
`
