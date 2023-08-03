import styled from 'styled-components';
import { colors, settings, shadows } from '../../../ThemeStyle';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  max-height: ${settings.wrapper}vh;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  /* padding: 20px; */
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`;
