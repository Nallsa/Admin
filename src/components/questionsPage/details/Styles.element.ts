import styled from 'styled-components'
import { colors } from '../../../ThemeStyle'

export const QuestionWrapper = styled.div`
  padding: 30px;
`

export const QuestionInfo = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`

export const Title = styled.div`
  font-weight: 500;
  color: ${colors.dark};
`
