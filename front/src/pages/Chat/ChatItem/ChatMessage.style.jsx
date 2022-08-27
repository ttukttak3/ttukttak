import styled from 'styled-components';

const Message = styled.div`
  display: flex;
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
    padding: 0.7rem;
    border-radius: 0.5rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 0.9rem;
    display: flex;
    align-items: flex-end;
  }

  &.another {
    flex-direction: row-reverse;
    span {
      margin-right: 0.9rem;
    }
    p {
      background: ${({ theme }) => theme.colors.$black4};
      color: ${({ theme }) => theme.colors.$white1};
    }
  }
`;

const style = { Message };

export default style;
