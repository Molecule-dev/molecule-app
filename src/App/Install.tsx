import React from 'react'
import styled from 'styled-components'
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
export const Instructions = styled((props: InstructionsProps) => (
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
))`
  margin: 0 auto 30px;
  padding: 0 0 0 15px;
  width: 100%;
  max-width: 450px;
  text-align: left;

  > li {
    margin: 15px;
  }
`

export type DetailsProps = React.HTMLProps<HTMLDetailsElement>

/**
 * Toggles the PWA installation instructions.
 */
export const Details = styled(({ children, ...props }: DetailsProps) => (
  <details { ...props }>
    <summary>
      PWA installation instructions
    </summary>

    {children}
  </details>
))`
  margin: 15px 0;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors] || `inherit`};

  > summary {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`

export type InstallProps = React.HTMLProps<HTMLDivElement>

/**
 * Describes various app installation methods.
 */
export const Install = styled((props: InstallProps) => (
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
))`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  padding: 0 15px 15px;

  > p {
    font-size: 18px;
    line-height: 24px;
  }

  > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0 10px;

    > a {
      margin: 5px;
      height: 50px;
  
      > img {
        height: 100%;
      }
    }

    @media (min-width: 450px) {
      flex-direction: row;
      margin: 0 -5px;

      > a {
        height: 40px;
      }
    }
  }
`
