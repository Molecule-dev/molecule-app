import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { ArrowLeftIcon, XIcon } from '@primer/octicons-react'
import { Header } from './Header'

export type ModalButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: `button` | `reset` | `submit`
}

/**
 * A button icon which can be rendered with an `onClick` handler, usually within a `ModalHeader`.
 */
export const ModalButton = styled(({ type = `button`, title = `Close`, ...props }: ModalButtonProps) => (
  <button type={type} title={title} { ...props } />
))`
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export type ModalCloseUnderlayProps = React.HTMLProps<HTMLButtonElement> & {
  type?: `button` | `reset` | `submit`
}

/**
 * A full-sized, semi-transparent underlay which can be rendered before your `Modal` with an `onClick` handler, usually to close the modal.
 */
export const ModalUnderlay = styled(({ type = `button`, title = `Close`, ...props }: ModalCloseUnderlayProps): React.ReactElement => (
  <button type={type} title={title} { ...props } />
))`
  &&& {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 0;
    border: 0;
    cursor: ${({ onClick }) => onClick ? `pointer` : `auto`};
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }
`

export const ModalHeader = styled(Header)`
  position: fixed;
  display: flex;
  justify-content: space-between;
`

export type ModalProps = React.HTMLProps<HTMLDivElement> & {
  position?: `left` | `right`
  backgroundColor?: string
  onBack?: () => void
  onClose?: () => void
}

/**
 * A custom modal component, defaults to a center `position` with 'left' or 'right' options.
 *
 * If `onClose` and/or `onBack` handlers are provided, the corresponding buttons will be added
 * within the `ModalHeader`, plus the `ModalUnderlay`.
 *
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 *
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 *
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ visible, setVisible ] = useState(false)
 *
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Click the button to show the modal.
 *       </p>
 *
 *       <UI.Button onClick={() => setVisible(true)}>
 *         <span>
 *           Click me
 *         </span>
 *       </UI.Button>
 *
 *       {visible && (
 *         <UI.Modal onClose={() => setVisible(false)}>
 *           <p>
 *             This is a centered modal.
 *           </p>
 *
 *           <p>
 *             Click the X at the top right to close it.
 *           </p>
 *         </UI.Modal>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export const Modal = styled(({ position, backgroundColor, onBack, onClose, children, ...props }: ModalProps) => {
  const rootElement = document.getElementById(`root`)
  const { current: modalElement } = useRef(document.createElement(`div`))

  useEffect(() => {
    if (rootElement) {
      rootElement.appendChild(modalElement)
    }

    return () => {
      if (rootElement) {
        rootElement.removeChild(modalElement)
      }
    }
  }, [ rootElement, modalElement ])

  const modal = (
    <div { ...props }>
      {(onBack || onClose) && (
        <>
          <ModalUnderlay onClick={onBack || onClose} />

          <ModalHeader>
            {onBack && (
              <ModalButton style={{ marginRight: `auto` }} onClick={onBack}>
                <ArrowLeftIcon size={25} />
              </ModalButton>
            )}

            {onClose && (
              <ModalButton style={{ marginLeft: `auto` }} onClick={onClose}>
                <XIcon size={25} />
              </ModalButton>
            )}
          </ModalHeader>
        </>
      )}

      <div>
        {children}
      </div>
    </div>
  )

  return rootElement ? createPortal(modal, modalElement) : modal
})`
  display: flex;
  flex-direction: column;
  z-index: 2000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding-top: ${({ theme, onBack, onClose }) => (onBack || onClose) ? theme.topPadding + 40 : 0}px;

  > ${ModalHeader} {
    display: flex;
    margin: auto;
  }

  > div {
    position: relative;
    max-width: ${({ theme }) => theme.breakpoints.laptop.width};
    margin: auto;
    padding: 15px;
    background: ${({ theme, backgroundColor = `` }) => theme.colors[backgroundColor as keyof typeof theme.colors] || backgroundColor || theme.colors.layerBackground};
    box-shadow: ${({ backgroundColor }) => backgroundColor === `transparent` ? `none` : `0 0 3px 3px rgba(0, 0, 0, 0.05)`};
    overflow: auto;
    overscroll-behavior: contain;
  }

  ${({ position }) => {
    if (position === `left`) {
      return css`
        > ${ModalHeader} {
          width: 100%;
          max-width: 380px;
          margin-left: 0;
        }

        > div {
          width: 100%;
          max-width: 380px;
          height: 100%;
          margin-left: 0;
        }
      `
    }

    if (position === `right`) {
      return css`
        > ${ModalHeader} {
          width: 100%;
          max-width: 380px;
          margin-right: 0;
        }

        > div {
          width: 100%;
          max-width: 380px;
          height: 100%;
          margin-right: 0;
        }
      `
    }

    return css`
      > div {
        border-radius: 3px;
      }
    `
  }}
`
