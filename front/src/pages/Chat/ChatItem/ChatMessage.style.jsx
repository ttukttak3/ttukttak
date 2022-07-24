import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  margin-right: auto;
  font-size: 1.4rem;
  height: 2.5rem;
  width: auto;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  color: ${({ theme }) => theme.colors.$white1};
  left: 0;
  time {
    font-size: 1.2rem;
    background: none;
  }
`;
const Right = styled.div`
  margin-left: auto;
  font-size: 1.4rem;
  height: 2.5rem;
  width: auto;
  background: ${({ theme }) => theme.colors.$black4};
  color: ${({ theme }) => theme.colors.$white1};
  right: 0;
  time {
    font-size: 1.2rem;
    background: none;
  }
`;

const style = { Wrapper, Left, Right };

export default style;
