import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  margin-bottom: 2.4rem;
  font-size: 2rem;

  :first-child {
    margin-top: 0.8rem;
  }
`;
const ImgBox = styled.div`
  margin-right: auto;
  width: 4.8rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 2.4rem;
  }
`;

const InfoWrapper = styled.div`
  margin-left: auto;
  width: 28.3rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  display: flex;
  p {
    color: ${({ theme }) => theme.colors.$white1};
    font-size: 1.6rem;
    font-weight: 700;

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
  //날짜
  p {
    color: ${({ theme }) => theme.colors.$white3};
    font-size: 1.4rem;
    font-weight: 400;
  }
  //알림
  span {
    margin-left: auto;
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$primaryBlueP};
    &.higher {
      width: 2.1rem;
      border-radius: 1rem;
    }
    &.highest {
      width: 2.7rem;
      border-radius: 1rem;
      :after {
        content: '+';
      }
    }
  }
`;

const style = { Wrapper, ImgBox, UserName, LastChat, InfoWrapper };

export default style;
