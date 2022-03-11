import React from 'react'
import styled from 'styled-components'

export interface IframeWrapperElement extends HTMLDivElement {
  __initialized?: boolean
  __initTimeout?: NodeJS.Timeout
}

/**
 * Attempts to set the height of the `iframe` to match the height of its contents.
 */
export const setHeight = (element: IframeWrapperElement): void => {
  const firstElementChild = element?.firstElementChild as HTMLIFrameElement
  const documentElement = firstElementChild?.contentWindow?.document?.documentElement
  const body = firstElementChild?.contentWindow?.document?.body

  if (documentElement && body) {
    const { top, bottom } = body.getBoundingClientRect()
    const height = `${40 + Math.ceil(Math.max(
      body.scrollHeight + top,
      body.offsetHeight + top,
      documentElement.offsetHeight + top,
      bottom
    ))}px`

    if (firstElementChild.style.height !== height) {
      firstElementChild.style.height = height
    }
  }
}

/**
 * Initializes the `iframe` to optionally mutate its contents
 * and add event listeners for adjusting its height.
 */
export const initIframe = (element: IframeWrapperElement, mutate?: (element: IframeWrapperElement) => void): void => {
  const firstElementChild = element?.firstElementChild as HTMLIFrameElement
  const contentWindow = firstElementChild?.contentWindow

  if (contentWindow && !element.__initialized) {
    const init = () => {
      setHeight(element)

      if (mutate) {
        mutate(element)
      }
    }

    init()
    element.__initTimeout = setTimeout(init, 100)

    contentWindow.addEventListener(`DOMContentLoaded`, init)
    contentWindow.addEventListener(`load`, init)
    contentWindow.addEventListener(`resize`, init)

    element.__initialized = true
  }
}

export type IframeProps = React.HTMLProps<HTMLIFrameElement> & {
  mutate?: (element: IframeWrapperElement) => void
}

/**
 * A styled `iframe` element which attempts to adjust its height depending on its contents.
 * 
 * You may also optionally mutate its contents for the same domain.
 * 
 * Example usage:
 * ```tsx
 * import React from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * const mutateAnchor = (anchor: HTMLAnchorElement) => {
 *   anchor.setAttribute(`target`, `_blank`)
 *   anchor.setAttribute(`rel`, `noopener noreferrer`)
 * }
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   return (
 *     <div { ...props }>
 *       <p>
 *         The link in the iframe below is mutated upon render to open in a new window.
 *       </p>
 * 
 *       <UI.Iframe
 *         title='Hello, World!'
 *         srcDoc={`
 *           <!DOCTYPE html>
 *           <html>
 *             <body>
 *               <a href='https://www.molecule.dev'>
 *                 Molecule.dev
 *               </a>
 *             </body>
 *           </html>
 *         `}
 *         mutate={element => {
 *           const iframe = element?.firstElementChild as HTMLIFrameElement
 *           const body = iframe?.contentWindow?.document?.body
 *           const anchors = body?.querySelectorAll(`a`)
 * 
 *           if (anchors?.length) {
 *             for (let i = 0; i < anchors.length; i++) {
 *               mutateAnchor(anchors[i])
 *             }
 *           }
 *         }}
 *       />
 *     </div>
 *   )
 * }
 */
export const Iframe = styled(({ className, title, mutate, ...props }: IframeProps) => {
  const [ element, setElement ] = React.useState<null | IframeWrapperElement>(null)

  React.useEffect(() => {
    const firstElementChild = element?.firstElementChild as HTMLIFrameElement
    const documentElement = firstElementChild?.contentWindow?.document?.documentElement
    let observer: null | MutationObserver = null

    if (documentElement) {
      observer = new MutationObserver(() => setHeight(element as IframeWrapperElement))
      observer.observe(documentElement, { attributes: true, childList: true, subtree: true })
    }

    return () => {
      if (element && typeof element.__initTimeout !== `undefined`) {
        clearTimeout(element.__initTimeout)
      }

      if (observer) {
        observer.disconnect()
      }
    }
  }, [ element ])

  return (
    <div
      className={className}
      ref={(element: IframeWrapperElement) => {
        setElement(element)
        initIframe(element, mutate)
      }}
    >
      <iframe title={title} scrolling='no' { ...props } />
    </div>
  )
})`
  -webkit-overflow-scrolling: touch;

  > iframe {
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`
