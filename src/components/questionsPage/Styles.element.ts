import styled from 'styled-components'
import { settings, shadows, colors } from '../../ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${settings.wrapper}vh;
  overflow: hidden;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`
