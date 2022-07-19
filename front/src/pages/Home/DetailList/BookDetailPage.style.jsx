import styled from 'styled-components';
import starBlue from '../../../assets/img/userInterFace/star_blue.png';
import libraryBlue from '../../../assets/img/userInterFace/local_library_blue.png';
import gradation from '../../../assets/img/userInterFace/big_gradation.png';
const Wrap = styled.div``;
const BookWrap = styled.div`
  width: 34rem;
  margin: 0 auto 9.2rem auto; //footer height:72
  text-align: left;
`;

const BookInfo = styled.div`
  margin-bottom: 3.3rem;
`;
const TitleBox = styled.div`
  h2 {
    padding-bottom: 1rem;
    width: 26rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #fff;
    line-height: 2.5rem;
    letter-spacing: -0.02rem;
  }
  h6 {
    border-top: 1px solid #fff;
    padding-top: 0.8rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: #bdc1c6;
  }
`;
const BookSlideBox = styled.div`
  margin: 5.2rem auto;
  width: 19.3rem;
  height: 28rem;
  background: gray;
  position: relative;

  img {
    width: 19.3rem;
    height: 28rem;
  }
  //book state
  button {
    display: block;
    width: 19.3rem;
    height: 5.3rem;
    position: absolute;
    bottom: 0;
    right: 0;
    background: url(${gradation}) no-repeat;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;

    &.noCursor {
      cursor: default;
    }

    img {
      vertical-align: text-top;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;
const BookCont = styled.div`
  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
  }
  p {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    line-height: 2rem;
  }
`;
const BookState = styled.div`
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: #bdc1c6;
  height: 1.6rem;
  line-height: 1.6rem;

  p {
    display: inline-block;
    padding-left: 2rem;
    height: 1.6rem;
  }
  p.bookmark {
    background: url(${starBlue}) center left no-repeat;
    width: 4.1rem;
  }

  p.loanCount {
    margin-left: 0.8rem;
    background: url(${libraryBlue}) center left no-repeat;
  }
`;

const LenderWrap = styled.div``;
const LenderInfo = styled.div`
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  padding: 2rem 0;
  display: flex;
  flex-direction: row;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
  }
  div {
    margin-left: 0.8rem;
  }
  div > h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
  }
  div > p {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: #bdc1c6;
  }
`;
const Counting = styled.div`
  border-bottom: 1px solid #333;
  display: flex;
  padding: 1.2rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  dt {
    color: #bdc1c6;
  }
  dd {
    margin-left: auto;
    color: #fff;
  }
`;

const ReviewWrap = styled.div``;

const OtherWrap = styled.div``;

const BookFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: #1c1c1c;
`;

const FooterBox = styled.div`
  width: 34rem;
  height: 7.2rem;
  padding: 1.4rem 0 1.5rem 0;
  margin: 0 auto;
  display: flex;

  button {
    margin: 0.4rem 0 0 auto;
    background: #26272b;
    width: 10.4rem;
    height: 3.6rem;
    line-height: 3.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #fff;
  }
`;
const LeftBox = styled.div`
  text-align: left;
  flex: 1;
  span {
    position: relative;
    display: inline-block;
    width: 3.8rem;
    padding-left: 0.4rem;
    height: 1.8rem;
    line-height: 1.9rem;
    vertical-align: middle;
    font-size: 1rem;
    letter-spacing: -0.06rem;
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
  span.orange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
  }
  //예약중
  span.gray {
    background: ${({ theme }) => theme.colors.$white4};
  }
  //대여가능
  span.blue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    width: 4.7rem;
  }
  //대여중 downbtn
  span.bigOrange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
    width: 4.8rem;
  }
  //예약중 downbtn
  span.bigGray {
    background: ${({ theme }) => theme.colors.$white4};
    width: 4.8rem;
  }
  //대여가능 downbtn
  span.bigBlue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    width: 5.7rem;
  }
`;
const BookPrice = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.1rem;

  div {
    flex: 1;
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
const BookDetailStyle = { Wrap, BookWrap, BookInfo, TitleBox, BookSlideBox, BookCont, BookState, LenderWrap, LenderInfo, Counting, ReviewWrap, OtherWrap, BookFooter, FooterBox, LeftBox, BookPrice };
export default BookDetailStyle;
