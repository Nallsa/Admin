import styled from 'styled-components'
import { settings, shadows, colors } from '../../ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${settings.wrapperStatic}vh;
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

export const OrderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 30px;
  @media (max-width: 1080px) {
    flex-wrap: wrap;
    padding: 5px;
  }
`

export const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 400px;
`

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const Title = styled.div`
  font-weight: 500;
`

export const GoodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  padding: 15px;
  height: 75vh;
  @media (max-width: 1080px) {
    padding: 2px;
  }
`

export const Good = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
