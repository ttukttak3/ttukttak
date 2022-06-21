import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 3rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white1};
  background: ${({ theme }) => theme.colors.$black3Line};
`;

const AddBtn = styled.img`
  display: block;
  margin-top: 1rem;
  height: 2.4rem;
  weight: 2.4rem;
`;

const SendBtn = styled.img`
  display: block;
  margin-top: 1rem;
  height: 2.4rem;
  weight: 2.4rem;
`;

const style = { Wrapper, Input, AddBtn, SendBtn };

export default style;
