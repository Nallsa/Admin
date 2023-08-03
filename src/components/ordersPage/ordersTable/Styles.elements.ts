import styled from 'styled-components';
import { colors, settings, shadows } from '../../../ThemeStyle';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* max-height: ${settings.wrapper}vh; */
  /* overflow: hidden; */
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`;
