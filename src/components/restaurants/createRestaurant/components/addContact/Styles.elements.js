import styled from 'styled-components'
import { colors } from 'ThemeStyle'

export const Wrapper = styled.div``

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* background-color: ${colors.cardHeader}; */
  padding: 0.875rem 1.625rem;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const HeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
`
