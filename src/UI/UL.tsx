import styled from 'styled-components'

export const UL = styled.ul<{ visible?: boolean }>`
  display: ${({ visible = true }) => visible ? `block` : `none`};
  margin: 0;
  padding: 0;
  list-style-type: none;

  > li {
    margin: 0;
    padding: 0;
  }
`
