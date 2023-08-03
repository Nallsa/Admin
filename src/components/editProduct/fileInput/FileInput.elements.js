import styled from 'styled-components'

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isFocused) {
    return '#2196f3'
  }
  return '#eeeeee'
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  width: 120px;
  height: 120px;
  margin: 5px;

  &:hover {
    border-color: #2196f3;
  }
`

export const UploadText = styled.p`
  font-size: 10px;
`

export const Thumb = styled.div`
  width: 120px;
  height: 120px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: solid;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  flex: 1;
  display: flex;
  transition: border 0.24s ease-in-out;
  margin: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  &:hover {
    border-color: #2196f3;
  }
`

export const ThumbInfo = styled.div`
  display: flex;
  width: 120px;
  height: auto;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  padding: 5px;
`
