import styled from 'styled-components';

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
      right: 0.4rem;
      top: 0.75rem;
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

const style = { LeftBox };

export default style;
