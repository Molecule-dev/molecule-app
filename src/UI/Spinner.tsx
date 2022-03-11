import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { CommitIcon } from '@primer/octicons-react'

export type SpinnerProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
  color?: string
  size?: `tiny` | `small` | `medium` | `large`
  inline?: boolean
  spin?: boolean
  style?: CSSProperties
}

/**
 * A spinning icon to indicate loading/pending state.
 * 
 * Provide `spin` as `false` stop the spinning.
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
 *       <UI.Spinner />
 *     </div>
 *   )
 * }
 * ```
 */
export const Spinner = styled(({ title = `Loading`, color = `primary`, size = `medium`, inline, spin = true, children, ...props }: SpinnerProps) => (
  <div title={title} { ...props }>
    <div>
      {children || <CommitIcon verticalAlign='top' aria-label={title} />}
    </div>
  </div>
))`
  position: relative;
  display: ${({ inline }) => inline ? `inline-flex` : `flex`};
  align-items: center;
  justify-content: center;
  width: ${({ size = `medium` }) => ({
    tiny: `20px`,
    small: `30px`,
    medium: `60px`,
    large: `120px`
  })[size] || `60px`};
  height: ${({ size = `medium` }) => ({
    tiny: `20px`,
    small: `30px`,
    medium: `60px`,
    large: `120px`
  })[size] || `60px`};
  margin: 0 auto;
  color: ${({ theme, color = `primary` }) => theme.colors[color as keyof typeof theme.colors] || color};
  
  &:empty {
    display: none;
  }

  > div {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    &:empty {
      display: none;
    }

    > svg {
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    ${({ spin = true }) => spin ? `
      animation: rotation 2s linear infinite;
    ` : ``}

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`
