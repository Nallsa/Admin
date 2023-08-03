import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const OptionBlock = styled.div`
  position: absolute;
  top: 0.875rem;
  right: 1.625rem;
`;

export const OptionIcon = styled.div`
  display: inline-block;
  padding: 0 0.25rem;
  line-height: 1.2;
`;

export const CardText = styled.div`
  text-align: center;
  /* padding-top: 1rem; */
  /* padding-bottom: 1rem; */
`;

export const Title = styled.div`
  font-size: 2.875rem;
  font-weight: 700;
  color: ${props => props.color};
`;

export const SubTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6c757d;
  letter-spacing: 0.0625em;
  text-transform: uppercase;
`;

const GlobalStyle = createGlobalStyle`
 *::before, *::after {
    box-sizing: inherit;
  }
`;
