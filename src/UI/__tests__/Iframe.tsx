/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../../App'
import { Iframe } from '../Iframe'

const srcDocBody = `
  <div style="height: 9001px">
    <p>
      Hello, World!
    </p>
  </div>

  <a href="http://some-external-link">
    Force this to open externally
  </a>
`

it('renders the srcDoc with adjusted height and optional mutations', async () => {
  const onAnchorClick = jest.fn()
  const overrideAnchor = (anchor: HTMLAnchorElement) => {
    anchor.setAttribute(`target`, `_blank`)
    anchor.setAttribute(`rel`, `noopener noreferrer`)
    anchor.addEventListener(`click`, event => {
      onAnchorClick()
      event.stopPropagation()
      event.preventDefault()
    }, false)
  }

  render(
    <App>
      <Iframe
        title='Hello, World!'
        srcDoc={`<!DOCTYPE html><body>${srcDocBody}</body>`}
        mutate={element => {
          const iframe = element?.firstElementChild as HTMLIFrameElement
          const body = iframe?.contentWindow?.document?.body
          const anchors = body?.querySelectorAll(`a`)

          if (anchors?.length) {
            for (let i = 0; i < anchors.length; i++) {
              overrideAnchor(anchors[i])
            }
          }
        }}
      />
    </App>
  )

  const iframe = screen.getByTitle(`Hello, World!`) as HTMLIFrameElement
  const body = iframe.contentWindow?.document.body
  let anchor: null | HTMLAnchorElement = null

  // confirm render
  expect(iframe).toBeInTheDocument()

  if (!body) {
    throw new Error(`No body in iframe.`)
  }

  // bit of a hack to make this work as expected with jest/jsdom
  body.innerHTML = srcDocBody

  // confirm anchor is mutated
  await waitFor(() => {
    anchor = body.querySelector(`a`)
    expect(anchor?.getAttribute(`target`)).toBe(`_blank`)
  })

  anchor = body.querySelector(`a`)
  expect(anchor?.getAttribute(`rel`)).toBe(`noopener noreferrer`)

  if (!anchor) {
    throw new Error(`Anchor not found in the iframe document.`)
  }

  // click the anchor (link)
  fireEvent.click(anchor)
  expect(onAnchorClick).toBeCalled()
})
