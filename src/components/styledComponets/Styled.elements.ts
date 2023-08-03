import styled from 'styled-components'

interface IRow {
	gap?: number
	mb?: number
}

export const Row = styled.div<IRow>`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${({gap})=> gap ? `${ gap }px` : ``} ;
  margin-bottom: ${({ mb }) => mb ? `${mb}px` : ``};
`
