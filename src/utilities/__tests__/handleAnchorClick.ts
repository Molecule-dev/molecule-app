import React from 'react'
import { handleAnchorClick } from '../handleAnchorClick'

it(`works in the native app environment only`, () => {
  expect(handleAnchorClick({
    currentTarget: {
      getAttribute: () => ``
    }
  } as unknown as React.MouseEvent<HTMLAnchorElement>)).toBe(undefined)
})
