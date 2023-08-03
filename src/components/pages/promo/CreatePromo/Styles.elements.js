import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const Label = styled.label`
  margin-bottom: 0.375rem;
  font-weight: 500;
  display: inline-block;
  justify-content: center;
`;

export const Input = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
`;
