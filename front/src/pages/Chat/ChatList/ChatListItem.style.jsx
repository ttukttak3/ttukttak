import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;
  list-style: none;
  border-bottom: 0.3px solid ${({ theme }) => theme.colors.$whiteLine4};
  margin: 1rem;
  font-size: 2rem;
`;
const Img = styled.img`
  text-align: left;
  width: 4rem;
  height: 4rem;
  margin: 0.6rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.$white1};
  font-size: 1.6rem;
  font-weight: 400;
  width: 100%;
  time {
    margin-top: 1rem;
    text-align: right;
    magin-left: auto;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const LastChat = styled.div`
  color: ${({ theme }) => theme.colors.$white3};
  font-size: 1.6rem;
  unread {
    magin-left: auto;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$primaryBlueP};
    padding: 0.3rem;
    border-radius: 1.5rem;
  }
`;

const style = { Wrapper, Img, UserName, LastChat, InfoWrapper };

export default style;
