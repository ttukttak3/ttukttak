import styled from 'styled-components';

const Wrapper = styled.div``;

const Left = styled.div`
  font-size: 2rem;
  height: 2.5rem;
  width: auto;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  color: ${({ theme }) => theme.colors.$white1};
  left: 0;
`;
const Right = styled.div`
  font-size: 2rem;
  height: 2.5rem;
  width: auto;
  background: ${({ theme }) => theme.colors.$black4};
  color: ${({ theme }) => theme.colors.$white1};
  right: 0;
`;

const style = { Wrapper, Left, Right };

export default style;
