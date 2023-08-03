import { FC, ReactNode } from 'react'
import { ColorTypes, Wrapper } from './Styles.elements'

interface IChip {
  children?: ReactNode
  color?: ColorTypes
  onClick?: any
  style?: React.CSSProperties
}

const Chip: FC<IChip> = ({ children, color, onClick, style }) => {
  return (
    <div style={style} onClick={onClick}>
      <Wrapper color={color}>{children}</Wrapper>
    </div>
  )
}

export default Chip
