import styled from 'styled-components'

export const H3 = styled.h3`
  max-width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};

  > strong {
    color: ${({ theme }) => theme.colors.strongText};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobileM.width}) {
    font-size: 25px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet.width}) {
    font-size: 35px;
  }
`
