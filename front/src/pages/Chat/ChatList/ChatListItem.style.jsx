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
  margin: 0.6rem;
`;
const UserName = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.$white1};
  text-align: left;
`;
const Time = styled.div`
  margin-top: 1rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.$white3};
`;
const LastChat = styled.div`
  color: ${({ theme }) => theme.colors.$white3};
`;
const Unread = styled.div``;

const style = { Wrapper, Img, UserName, Time, LastChat, Unread };

export default style;
