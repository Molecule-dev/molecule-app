import React from 'react'
import styled from 'styled-components'
import { AlertIcon, CheckIcon, CommitIcon } from '@primer/octicons-react'
import { Spinner } from './Spinner'

export type StatusIconColors = Record<string, string>
export type StatusIcons<C = StatusIconColors> = Record<keyof C, React.ReactElement>

export const defaultStatusIconColors: StatusIconColors = {
  pending: `blue`,
  resolved: `green`,
  rejected: `red`
}

export const defaultStatusIcons: StatusIcons = {
  pending: <CommitIcon aria-label='Pending' />,
  resolved: <CheckIcon aria-label='Resolved' />,
  rejected: <AlertIcon aria-label='Rejected' />
}

export type StatusIconProps = Parameters<typeof Spinner>[0] & {
  title?: string
  size?: `small` | `medium` | `large`
  colors?: StatusIconColors
  icons?: StatusIcons
  status?: keyof StatusIconColors
  spin?: boolean
}

/**
 * An icon to represent the state of some promise.
 * 
 * Designed to be paired with the {@link hooks.usePromise | `usePromise`} hook.
 * 
 * Example usage:
 * ```tsx
 * import React from 'react'
 * import { usePromise } from '../../hooks/usePromise'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ randomNumberRequest, requestRandomNumber ] = usePromise(async () => {
 *     await new Promise(resolve => setTimeout(resolve, 1000))
 * 
 *     if (Math.random() < 0.5) {
 *       return Math.random()
 *     } else {
 *       throw new Error(`Try again!`)
 *     }
 *   })
 * 
 *   const isPending = randomNumberRequest.status === 'pending'
 * 
 *   return (
 *     <div style={{ textAlign: `center` }} { ...props }>
 *       <p>
 *         Click the button to asynchronously set a random number. It has a 50% chance of throwing an error.
 *       </p>
 * 
 *       <p>
 *         Current random number: {randomNumberRequest.value || `?`}
 *       </p>
 * 
 *       <UI.Button onClick={() => requestRandomNumber()} disabled={isPending}>
 *         <span>
 *           {isPending
 *             ? `Wait a second...`
 *             : `Get a random number`
 *           }
 *         </span>
 *       </UI.Button>
 * 
 *       <UI.StatusIcon status={randomNumberRequest.status} />
 * 
 *       <UI.Error>
 *         {randomNumberRequest.error}
 *       </UI.Error>
 *     </div>
 *   )
 * }
 * ```
 */
export const StatusIcon = styled(({
  size = `small`,
  colors = defaultStatusIconColors,
  icons = defaultStatusIcons,
  status,
  spin = status === `pending`,
  ...props
}: StatusIconProps) => !status ? null : (
  <Spinner
    title={status[0].toUpperCase() + status.substring(1)}
    size={size}
    color={colors[status]}
    spin={spin}
    { ...props }
  >
    {icons[status]}
  </Spinner>
))`
  padding: 5px;
`
