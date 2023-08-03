import styled from 'styled-components'
import { colors, settings, shadows } from '../../ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`
