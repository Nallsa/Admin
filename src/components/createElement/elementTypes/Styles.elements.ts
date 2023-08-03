import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { colors, settings, shadows } from '../../../ThemeStyle';
import { ColorTypes } from '../../chip/Styles.elements';

interface IMenuItem {
  $color?: ColorTypes;
}

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  min-width: 300px;
  /* padding: 20px; */
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;
  &:hover {
    box-shadow: ${shadows.medium};
  }
  @media (max-width: 420px) {
    min-width: 200px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Item = styled(MenuItem)<IMenuItem>`
  border-radius: 5px !important;
  margin: 5px !important;
  overflow: hidden;

  &:hover {
    background-color: ${({ $color }) => {
      if ($color) {
        return `${colors[`${$color}_active`]} !important`;
      }
    }};
  }
`;
