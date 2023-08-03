import React from 'react'
import Block from '../block'

import {
  OptionBlock,
  OptionIcon,
  CardText,
  Title,
  SubTitle,
} from './ResultsCard.elements'

interface IProps {
  total?: string | number
  AddIcon?: any
  text: string
  color: string
  Icon?: any
  onClick?: any
}

const ResultsCard: React.FC<IProps> = ({
  total,
  text,
  color,
  Icon,
  AddIcon,
  onClick,
}) => {
  return (
    <Block style={{ cursor: 'pointer' }} onClick={onClick}>
      <OptionBlock>
        <OptionIcon>{Icon ? <Icon sx={{ color: color }} /> : ''}</OptionIcon>
      </OptionBlock>
      <CardText>
        <Title color={color}>
          {AddIcon ? <AddIcon size={20} sx={{ fontSize: 50 }} /> : total}
        </Title>
        <SubTitle>{text}</SubTitle>
      </CardText>
    </Block>
  )
}

export default ResultsCard
