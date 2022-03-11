import React from 'react'
import styled from 'styled-components'
import { getErrorMessage, VariableError } from '../utilities/getErrorMessage'

export type ErrorProps = React.HTMLProps<HTMLDivElement> & {
  error?: VariableError
  center?: boolean
  children?: VariableError | boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null
}

/**
 * Displays a readable error message from some `Error`.
 * 
 * You can pass the error as a property or as children.
 * 
 * If there is no error, the element will be hidden using `display: none`.
 * 
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ error, setError ] = useState<null | Error>(null)
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Click the button to produce an error.
 *       </p>
 * 
 *       <UI.Button onClick={() => setError(new Error(`This is an error!`))}>
 *         <span>
 *           Click me
 *         </span>
 *       </UI.Button>
 * 
 *       <p>
 *         <UI.Error>
 *           {error}
 *         </UI.Error>
 *       </p>
 *     </div>
 *   )
 * }
 * ```
 */
export const Error = styled(({ error, center, children = getErrorMessage(error), ...props }: ErrorProps) => (
  <div { ...props }>
    {React.isValidElement(children) ? children : getErrorMessage(children as VariableError)}
  </div>
))`
  border: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.red};

  ${({ center }) => center ? `
    text-align: center;
  ` : ``}

  &:empty {
    display: none;
  }
`
