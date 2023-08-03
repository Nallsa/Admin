import {FC} from 'react'

import { BlockWrapper } from './Block.elements'

interface IProps {
  style?: {}
  children: any
  onClick?: any
}

const Block: FC<IProps> = ({ style, children, onClick }) => {
  return (
    <BlockWrapper
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      {children}
    </BlockWrapper>
  )
}

export default Block
