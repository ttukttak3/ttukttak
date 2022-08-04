import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.$white4};
  text-align: left;
  margin-bottom: 0.8rem;
  p {
    max-width: 23.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2.2rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 0.9rem;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.$white4};
  text-align: left;
  margin-bottom: 0.8rem;
  p {
    max-width: 23.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    background: ${({ theme }) => theme.colors.$black4};
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2.2rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 0.9rem;
  }
`;

const style = { Wrapper, Left, Right };

export default style;
