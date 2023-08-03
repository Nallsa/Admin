import styled from 'styled-components';
import { colors, settings, shadows } from '../../../ThemeStyle';

export const Wrapper = styled.div<any>`
  display: flex;
  padding: 20px;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  width: ${({ mini }) => (mini ? '400px' : '100%')};
  max-width: ${({ mini }) => (mini ? '100%' : '100%')};
  margin: 0 auto;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 360px;
  @media (max-width: 520px) {
    width: 250px;
  }
  @media (max-width: 420px) {
    width: 180px;
  }
`;
export const Row = styled.div`
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Label = styled.label`
  margin-bottom: 0.375rem;
  font-weight: 500;
  display: inline-block;
`;
