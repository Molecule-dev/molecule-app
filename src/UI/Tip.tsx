import styled from 'styled-components'
import { mix } from 'polished'

/**
 * Example usage:
 * 
 * ```tsx
 * <UI.Tip color='green'>
 *   <LightBulbIcon size={20} />
 *
 *   <span>
 *     Some tip here.
 *   </span>
 * </UI.Tip>
 * ```
 */
export const Tip = styled.div`
  position: relative;
  margin: 15px auto;
  padding: 15px 20px 15px 37px;
  border-radius: 3px;
  font-size: 17px;
  line-height: 1.5;
  background-color: ${({ theme, color = `gray` }) => mix(0.1, theme.colors[color as keyof typeof theme.colors], `rgba(128, 128, 128, 0.1)`)};
  border-left: 5px solid ${({ theme, color = `gray` }) => theme.colors[color as keyof typeof theme.colors] || `inherit`};

  &:empty {
    margin: 0;
  }

  > svg {
    position: absolute;
    top: 15px;
    left: 10px;
    width: 20px;
    height: 20px;
    fill: ${({ theme, color = `gray` }) => theme.colors[color as keyof typeof theme.colors] || `currentColor`};
  }
`
