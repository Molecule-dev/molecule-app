import React from 'react'
import styled from 'styled-components'

export const Section = styled(({ theme, children, ...props }) => (
  <section { ...props }>
    <div>
      {children}
    </div>
  </section>
))`
  > div {
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;
  }
`
