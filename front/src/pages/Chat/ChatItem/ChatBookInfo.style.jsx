import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  list-style: none;
  height: 8rem;
`;

const BookImg = styled.div`
  text-align: left;
  img {
    width: 4rem;
    height: 6.8rem;
    margin: 0.6rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  margin-right: auto;
  author {
    color: ${({ theme }) => theme.colors.$white2};
    margin-left: auto;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 0.8rem;
  div {
    height: 1.4rem;
    line-height: 1.4rem;
  }
  div > p:first-child {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
    margin-right: 0.4rem;
  }
  div > p {
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const Location = styled.div`
  font-size: 1.6rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.$white2};
  img {
    width: 2.5rem;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;

const LeftBox = styled.div`
  text-align: left;
  flex: 1;
  span {
    position: relative;
    display: inline-block;
    width: 3.8rem;
    height: 1.8rem;
    line-height: 1.9rem;
    font-size: 1rem;
    text-align: center;
    letter-spacing: -0.06rem;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.$white1};

    //버튼
    img {
      position: absolute;
      top: 0.75rem;
      right: 0.4rem;
      width: 0.8rem;
      height: 0.49rem;
    }
  }
  //대여중
  .orange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
  }
  //예약중
  .gray {
    background: ${({ theme }) => theme.colors.$white4};
  }
  //대여가능
  .blue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    width: 4.7rem;
  }
  //대여중 downbtn
  .bigOrange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
    text-align: left;
    padding-left: 0.4rem;
    width: 4.8rem;
  }
  //예약중 downbtn
  .bigGray {
    background: ${({ theme }) => theme.colors.$white4};
    text-align: left;
    padding-left: 0.4rem;
    width: 4.8rem;
  }
  //대여가능 downbtn
  .bigBlue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    text-align: left;
    padding-left: 0.4rem;
    width: 5.7rem;
  }
`;

const style = { Wrapper, BookImg, Title, LeftBox, InfoWrapper, Location, Status };

export default style;
