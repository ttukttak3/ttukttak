import styled from 'styled-components';
import arrowRight from '../../../assets/img/arrows/Keyboard_arrow_right.svg';
const Wrapper = styled.div`
  width: 34rem;
  margin: 0 auto;
`;

const BookBox = styled.div`
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
const Price = styled.div`
  margin: 2rem 0;
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
const style = { Wrapper, BookBox, Book, Info, Price, GoPage };

export default style;
