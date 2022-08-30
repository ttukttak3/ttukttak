import styled from 'styled-components';
import arrowRight from '../../../assets/img/arrows/Keyboard_arrow_right.svg';
import downBtn from '../../../assets/img/arrows/white_down.svg';
const Wrapper = styled.div`
  width: 39rem;
  margin: 0 auto;
`;

const Title = styled.div`
  div {
    text-align: left;
    width: 34rem;
    margin: 2rem auto 0 auto;
    //text
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }
    p {
      margin-top: 1.3rem;
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 2rem;
      letter-spacing: -0.12rem;
      color: #fff;
    }
  }
`;

const Progress = styled.div`
  width: 39rem;
  padding: 2rem 2.5rem;
  border-bottom: 1px solid #333;

  img {
    width: 34rem;
    height: 0.5rem;
  }
`;
const BarBox = styled.div``;
const BarDate = styled.div`
  position: relative;
  width: 34rem;
  height: 3rem;
  color: #9aa0a6;
  margin-bottom: 0.8rem;
  p {
    position: absolute;
    :first-child {
      bottom: 0;
      left: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }
    &.center {
      bottom: 0;
      left: 15.4rem;
      font-size: 1.2rem;
      font-weight: 700;
    }
    :last-child {
      bottom: 0;
      right: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }
    span {
      display: block;
      margin-top: 0.5rem;
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
`;
const BarState = styled.div`
  margin-top: 0.8rem;
  position: relative;
  width: 34rem;
  height: 1.2rem;
  p {
    position: absolute;
    :first-child {
      bottom: 0;
      left: 0;
      font-size: 1.2rem;
      font-weight: 700;
    }
    &.center {
      bottom: 0;
      left: 14.8rem;
      font-size: 1.2rem;
      font-weight: 700;
    }
    :last-child {
      bottom: 0;
      right: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #676c71;
    }
  }
`;
const State = styled.div`
  width: 34rem;
  margin: 0 auto;
  //대여상태 변경하기
  h3 {
    text-align: left;
    font-size: 1.4rem;
    height: 5.2rem;
    padding-top: 2.1rem;
    position: relative;
    //타이틀 옆 대여중 버튼
    button {
      position: absolute;
      top: 1.5rem;
      right: 0;
      width: 6.5rem;
      height: 2.4rem;
      text-align: left;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.$white3};
      background: url(${downBtn}) right center no-repeat;
    }
  }
  //연장 버튼
  div {
    width: 34rem;
    display: flex;
    flex-direction: row;
    button {
      flex: 1;
      width: 1.6rem;
      height: 3.6rem;
      line-height: 3.6rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.$white1};
      border: 1px solid ${({ theme }) => theme.colors.$white1};
      :last-child {
        margin-left: 2rem;
      }
    }
    .gray {
      color: ${({ theme }) => theme.colors.$white4};
      border: 1px solid ${({ theme }) => theme.colors.$white4};
    }
  }
`;

const Price = styled.div`
  width: 34rem;
  margin: 2rem auto;
  ul {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    padding: 2rem 0;
  }
  ul li {
    display: flex;
    flex-direction: row;
    text-align: left;
    margin-bottom: 1.2rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: #bdc1c6;
    p {
      margin-left: auto;
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
    }
    //연체료
    :last-child {
      margin-bottom: 0;
      p {
        color: #c33025;
      }
    }
  }
  //돌려줄 금액
  div {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;

    p {
      font-size: 1.4rem;
      font-weight: 400;
      color: #bdc1c6;
      :last-child {
        margin-left: auto;
        font-size: 1.8rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }
`;
const GoPage = styled.div`
  width: 34rem;
  margin: 0 auto;
  ul li {
    background: url(${arrowRight}) right center no-repeat;
    border-bottom: 1px solid #5f6368;
    height: 4.8rem;
    line-height: 4.8rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: left;
  }
`;

const BookBox = styled.div`
  width: 34rem;
  margin: 2rem auto 0 auto;
  text-align: left;
  //반납일
  h2 {
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 400;
    color: #fff;
    border-bottom: 1px solid #fff;
    padding-bottom: 0.2rem;
  }
`;
const Book = styled.div`
  margin-top: 2.8rem;
  display: flex;
  flex-direction: row;
  img {
    width: 6rem;
    height: 8.7rem;
  }
`;
const Info = styled.div`
  margin-left: 2rem;
  //도서제목
  h4 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #fff;
  }
  //저자
  h6 {
    margin: 0.6rem 0 4.1rem 0;
    min-height: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: #9aa0a6;
  }
  //차입자
  p {
    span {
      display: inline-block;
      margin-right: 0.8rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: #bdc1c6;
    }
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
  }
`;
const style = { Title, Wrapper, Progress, BarBox, BarDate, BarState, BookBox, Book, Info, State, Price, GoPage };

export default style;
