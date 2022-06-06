import styled from 'styled-components';

const Wrapper = styled.li`
  list-style: none;
  border-bottom: ${({ theme }) => theme.colors.$black1};
  border: 1px;
`;
const Img = styled.img`
  text-align: left;
`;
const UserName = styled.div`
  text-align: left;
`;
const Time = styled.div`
  text-align: right;
`;
const LastChat = styled.div``;
const Unread = styled.div``;

const style = { Wrapper, Img, UserName, Time, LastChat, Unread };

export default style;
