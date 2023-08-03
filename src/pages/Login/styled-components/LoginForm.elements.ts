import styled from 'styled-components'


export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 450px;
  padding: 30px;
  border-radius: 15px;
  -webkit-box-shadow: 1px 1px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 1px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 1px 8px 0px rgba(34, 60, 80, 0.2);
  @media (max-width: 460px) {
    width: 320px;
  }
`