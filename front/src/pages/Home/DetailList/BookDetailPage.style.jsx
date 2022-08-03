import styled from 'styled-components';
import starBlue from '../../../assets/img/userInterFace/star_blue.svg';
import libraryBlue from '../../../assets/img/userInterFace/local_library_blue.svg';
import gradation from '../../../assets/img/userInterFace/big_gradation.png';
import opacity from '../../../assets/img/userInterFace/opacityBg.png';

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
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2.5rem;
    letter-spacing: -0.02rem;
  }
  h6 {
    border-top: 1px solid ${({ theme }) => theme.colors.$whiteLine1};
    padding-top: 0.8rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;
const BookSlideBox = styled.div`
  margin: 5.2rem auto 4rem auto;
  width: 19.3rem;
  //이미지 280 + 페이지네이션까지 12 + 페이지 네이션 2
  height: 29.4rem;
  position: relative;

  img {
    width: 19.3rem;
    height: 28rem;
  }

  //book state
  button {
    display: block;
    width: 100%;
    height: 5.3rem;
    position: absolute;
    bottom: 1.4rem;
    right: 0;
    background: url(${gradation}) repeat;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};

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
    color: ${({ theme }) => theme.colors.$white1};
  }
  p {
    margin-top: 1rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    line-height: 2rem;
  }
`;
const BookState = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.$white2};
  height: 1.6rem;
  line-height: 1.6rem;

  p {
    display: inline-block;
    padding-left: 2rem;
    height: 1.6rem;
    font-size: 1.4rem;
    font-weight: 400;
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
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
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
    color: ${({ theme }) => theme.colors.$white1};
  }
  div > p {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;
const Counting = styled.dl`
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  display: flex;
  padding: 1.2rem 0;
  dt {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }
  dd {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    margin-left: auto;
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
  background: url(${opacity}) repeat;
`;

const FooterBox = styled.div`
  width: 34rem;
  height: 7.2rem;
  padding: 1.4rem 0 1.5rem 0;
  margin: 0 auto;
  display: flex;

  button {
    margin: 0.4rem 0 0 auto;
    background: ${({ theme }) => theme.colors.$black4};
    width: 10.4rem;
    height: 3.6rem;
    line-height: 3.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
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

const BookDetailStyle = {
  Wrap,
  BookWrap,
  BookInfo,
  TitleBox,
  BookSlideBox,
  BookCont,
  BookState,
  LenderWrap,
  LenderInfo,
  Counting,
  ReviewWrap,
  OtherWrap,
  BookFooter,
  FooterBox,
  LeftBox,
  BookPrice,
};
export default BookDetailStyle;
