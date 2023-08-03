import styled from 'styled-components'
import { colors, shadows } from '../../ThemeStyle'

export enum ColorTypes {
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  light_green = 'light_green',
  light_blue = 'light_blue',
  blue = 'blue',
  purple = 'purple',
  light_gray = 'light_gray',
  gray = 'gray',
}

interface IWrapper {
  color?: ColorTypes
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  padding: 5px 10px;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: flex-start;
  /* width: 100%; */
  /* padding: 20px; */
  background-color: ${({ color }) => {
    if (color) {
      return `${colors[color]}`
    }
  }};
  border-radius: 5px;
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;
  color: ${({ color }) => (color ? '#fff' : '#262626')};

  &:hover {
    background-color: ${({ color }) => {
      if (color) {
        return `${colors[`${color}_active`]}`
      }
    }};
  }
`
