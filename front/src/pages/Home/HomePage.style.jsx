import styled from 'styled-components';
import Expand_more_gray from '../../assets/img/arrows/expand_more_gray.svg';
import posting from '../../assets/img/btn/posting.svg';
import star from '../../assets/img/userInterFace/star.svg';
import library from '../../assets/img/userInterFace/local_library.svg';
import gradation from '../../assets/img/userInterFace/gradation.png';

//scroll시 titlebox가 header가 되기에 width 따로 작업.
const HomeWrap = styled.div`
  width: 34rem; //작업 후 100으로 수정 예정
  margin: 0 auto;
  position: relative;
`;

const TitleBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  //대여가능, 대여중/예약중 title
  .active {
    font-size: 1.7rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$whiteLine1};
    margin-right: auto;
  }
  .hide {
    display: none;
  }

  button {
    text-align: left;
    margin-top: 1.2rem;
    padding-left: 1.25rem;
    width: 8.1rem;
    height: 2.3rem;
    line-height: 2.3rem;
    border: 1px solid ${({ theme }) => theme.colors.$black3Line};
    background: url(${Expand_more_gray}) 92% center no-repeat;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  button:last-child {
    margin-left: 0.8rem;
    padding: 0 2rem 0 0.95rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const BookWrap = styled.div`
  width: 34rem;
  min-height: 40rem;
  margin: 2.8rem auto;
  text-align: left;
`;

const NoItem = styled.p`
  height: 40rem;
  line-height: 40rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const BookBox = styled.dl`
  display: flex;
  flex-direction: row;
  height: 11.6rem;
  margin-top: 3.6rem;

  :first-child {
    margin-top: 0;
  }
  //book img
  dt {
    width: 8rem;
    background: #efefef;
    margin-right: 1.6rem;
    position: relative;
    img {
      width: 8rem;
      height: 11.6rem;
    }
    //book state
    button {
      display: block;
      width: 8rem;
      height: 2.2rem;
      position: absolute;
      bottom: 0;
      right: 0;
      background: url(${gradation}) no-repeat;
      font-size: 1.6rem;
      font-weight: 700;
      color: #fff;
    }
  }
`;

const BookTitle = styled.div`
  height: 3.2rem;
  font-weight: 400;
  h4 {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.$white1};
    margin-bottom: 0.4rem;
    width: 24.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const BookLocation = styled.div`
  height: auto;
  margin: 1.6rem 0 0.8rem 0;

  p {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    vertical-align: middle;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }

  span {
    display: inline-block;
    width: 3.8rem;
    height: 1.8rem;
    line-height: 1.9rem;
    margin-right: 0.4rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.$white1};
    text-align: center;
    vertical-align: middle;
  }

  span.orange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
    letter-spacing: -0.06rem;
  }

  span.gray {
    background: ${({ theme }) => theme.colors.$white4};
    letter-spacing: -0.06rem;
  }

  span.blue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    letter-spacing: -0.06rem;
    width: 4.7rem;
  }
`;

const BookPrice = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  margin-bottom: 0.8rem;
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

const BookState = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};
  height: 2rem;
  padding-top: 0.4rem;
  display: flex;
  flex-direction: row;

  p {
    padding-left: 1.9rem; //아이콘 사이즈 16 + 숫자 간격 3
    width: auto;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }

  p.bookmark {
    background: url(${star}) left center no-repeat;
    margin-right: 1.8rem;
  }

  p.loanCount {
    background: url(${library}) left center no-repeat;
  }
`;

const PlusBtn = styled.button`
  background: url(${posting});
  width: 4.4rem;
  height: 4.4rem;
  position: fixed;
  right: 2.5rem;
  bottom: 7.6rem;
  z-index: 1;
`;

const HomeStyle = { HomeWrap, TitleBox, BookWrap, BookBox, BookTitle, BookLocation, BookPrice, BookState, PlusBtn, NoItem };

export default HomeStyle;
