import styled from 'styled-components'
import { shadows } from '../../../../ThemeStyle'

export const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  box-shadow: ${shadows.small};
  padding: 10px;
  min-height: 150px;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`

export const CardImage = styled.div`
  position: relative;
  height: 140px;
  width: 140px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-right: 20px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;

  &:hover {
    transform: rotate(3deg) scale(1.05);
    -webkit-transform: rotate(3deg) scale(1.05);
    -moz-transform: rotate(3deg) scale(1.05);
    -ms-transform: rotate(3deg) scale(1.05);
    -o-transform: rotate(3deg) scale(1.05);
  }
`

export const Description = styled.div`
  width: 60%;
  height: 100%;
`

export const Title = styled.div`
  display: block;
  font-size: 1.17em;
  font-weight: bold;
`

export const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
`

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 140px;
`
