import styled from 'styled-components'

export const P = styled.p`
  display: block;
  max-width: 100%;
  margin: 15px auto;
  font-size: 17px;
  line-height: 1.5;
  color: ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors] || `inherit`};

  &:empty {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobileM.width}) {
    font-size: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet.width}) {
    font-size: 25px;
  }
`
