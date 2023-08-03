import styled from 'styled-components';
import { colors, settings, shadows } from '../../../ThemeStyle';

export const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  overflow: hidden;
  justify-content: flex-start;
  width: 100%;
  /* padding: 20px; */
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;
  padding: 0.875rem 1.625rem;
  gap: 10px;

  &:hover {
    box-shadow: ${shadows.medium};
  }
  @media (max-width: 500px) {
    padding: 10px 0px 10px 7px;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 980px) {
    display: block;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* background-color: ${colors.cardHeader}; */
  padding: 0.875rem 1.625rem;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const Row = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const Column = styled.div`
  flex-direction: column;
  display: flex;
  width: 33%;
  @media (max-width: 980px) {
    width: 100%;
  }
`;

export const Contacts = styled.div`
  padding-left: 0.875rem;
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const HeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${colors.light};
  padding: 1.625rem 1.625rem;
`;
