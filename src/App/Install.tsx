import React from 'react'
import { handleAnchorClick } from '../utilities/handleAnchorClick'

/**
 * An array of objects describing each app store badge.
 */
export const appStoreBadges: Array<{
  href: string
  imgSrc: string
  imgAlt: string
}> = [
]

export type InstructionsProps = React.HTMLProps<HTMLUListElement>

/**
 * How to install the progressive web app (PWA).
 */
export const Instructions = (props: InstructionsProps) => (
  <ul { ...props }>
    <li>
      Open <a href='https://app.molecule.dev' target='_blank' rel='noopener noreferrer' onClick={handleAnchorClick}>app.molecule.dev</a> in any web browser on desktop or mobile which supports PWA installation. Popular browsers include Chrome, Brave, Edge, Samsung, and Mobile Safari.
    </li>

    <li>
      If your browser supports it, click the "Install" option that appears on the right side of your address bar when you load the page. For some mobile browsers (like iOS Safari), there may be an "Add to Homescreen" option to use instead.
    </li>

    <li>
      After installation, you can use Molecule just like any other app!
    </li>
  </ul>
)

export type DetailsProps = React.HTMLProps<HTMLDetailsElement>

/**
 * Toggles the PWA installation instructions.
 */
export const Details = ({ children, ...props }: DetailsProps) => (
  <details { ...props }>
    <summary>
      PWA installation instructions
    </summary>

    {children}
  </details>
)

export type InstallProps = React.HTMLProps<HTMLDivElement>

/**
 * Describes various app installation methods.
 */
export const Install = (props: InstallProps) => (
  <div { ...props }>
    <h2>
      Quick Installation
    </h2>

    <p>
      <span>Molecule is a progressive web application, which means </span>
      <span>you can install it instantly and always get the latest updates, fast.</span>
    </p>

    <Details>
      <Instructions />
    </Details>

    {appStoreBadges.length > 0 && (
      <>
        <p>
          Or get it from app stores:
        </p>

        <div>
          {appStoreBadges.map(({ href, imgSrc, imgAlt }) => (
            <a key={href} href={href} onClick={handleAnchorClick}>
              <img src={imgSrc} alt={imgAlt} />
            </a>
          ))}
        </div>
      </>
    )}
  </div>
)
