import styled from 'styled-components'
import { colors, settings, shadows } from '../../../ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
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

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${colors.cardHeader};
  padding: 0.875rem 1.625rem;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${colors.light};
  padding: 1.625rem 1.625rem;
`
