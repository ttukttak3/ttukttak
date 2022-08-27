import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  margin-bottom: 2.4rem;
  font-size: 2rem;

  :first-child {
    margin-top: 0.8rem;
  }
`;
const Img = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 2.4rem;
`;

const InfoWrapper = styled.div`
  width: 100%;
  margin-left: 0.8rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  display: flex;
  p {
    color: ${({ theme }) => theme.colors.$white1};
    font-size: 1.6rem;
    font-weight: 400;

    &.unknown {
      color: ${({ theme }) => theme.colors.$white2};
    }
  }
  span {
    margin-left: auto;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const LastChat = styled.div`
  display: flex;
  margin-top: 1rem;
  p {
    color: ${({ theme }) => theme.colors.$white3};
    font-size: 1.4rem;
  }
  span {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$primaryBlueP};
    padding: 0.3rem;
    font-size: 1.2rem;
    border-radius: 1.5rem;
  }
`;

const style = { Wrapper, Img, UserName, LastChat, InfoWrapper };

export default style;
