import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex-direction: row;
  margin-right: auto;
  height: 4rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.$white4};
  msg {
    font-size: 2rem;
    width: auto;
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    color: ${({ theme }) => theme.colors.$white1};
    padding: 0.3rem 0.8rem 0.3rem 0.8rem;
    margin-right: 0.5rem;
    border-radius: 0.5rem;
  }
`;

const Right = styled.div`
  flex-direction: row;
  margin-left: auto;
  height: 4rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.$white4};
  msg {
    font-size: 2rem;
    width: auto;
    background: ${({ theme }) => theme.colors.$black4};
    color: ${({ theme }) => theme.colors.$white1};
    padding: 0.3rem 0.8rem 0.3rem 0.8rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const style = { Wrapper, Left, Right };

export default style;
