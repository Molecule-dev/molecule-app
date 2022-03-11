import styled from 'styled-components'

export const H1 = styled.h1`
  max-width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  font-size: 35px;
  font-weight: normal;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};

  > strong {
    color: ${({ theme }) => theme.colors.strongText};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobileM.width}) {
    font-size: 40px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobileL.width}) {
    font-size: 45px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet.width}) {
    font-size: 50px;
  }
`
