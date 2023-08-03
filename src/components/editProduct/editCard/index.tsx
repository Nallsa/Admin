import React from 'react'

import { Wrapper, CardHeader, CardBody, HeaderTitle } from './EditCard.elements'

interface IProps {
  style?: {}
  children: any
  onClick?: any
  title?: string
  option?: React.ReactElement
}

const EditCard: React.FC<IProps> = ({
  style,
  title,
  option,
  children,
  onClick,
}) => {
  return (
    <Wrapper
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <CardHeader>
        <HeaderTitle>{title}</HeaderTitle>
        {option}
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Wrapper>
  )
}

export default EditCard
