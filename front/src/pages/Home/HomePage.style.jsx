import styled from 'styled-components';
import Expand_more_gray from '../../assets/img/arrows/expand_more_gray.png';
import Posting from '../../assets/img/btn/posting.png';
import Star from '../../assets/img/userInterFace/star.png';
import local_library from '../../assets/img/userInterFace/local_library.png';

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

  h2 {
    font-size: 1.7rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$whiteLine1};
    margin-right: auto;
  }

  select {
    margin-top: 1.2rem;
    padding: 0px 8px;
    width: 8.1rem;
    height: 2.3rem;
    line-height: 2.3rem;
    border: 1px solid ${({ theme }) => theme.colors.$black3Line};
    background: url(${Expand_more_gray}) 90% center no-repeat;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  select:last-child {
    margin-left: 8px;
  }
`;

const BookWrap = styled.div`
  width: 34rem;
  margin: 2.8rem auto;
  text-align: left;
`;

const BookBox = styled.dl`
  display: flex;
  flex-direction: row;
  height: 11.6rem;
  margin-top: 3.6rem;

  :first-child {
    margin-top: 0;
  }

  dt {
    width: 8rem;
    background: #efefef;
    margin-right: 1.6rem;
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
  span {
    display: inline-block;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.$white1};
    width: 3.8rem;
    text-align: center;
    margin-right: 0.4rem;
  }
  span.orange {
    background: ${({ theme }) => theme.colors.$primaryDeepOrageP};
  }

  span.gray {
    background: ${({ theme }) => theme.colors.$white4};
  }

  span.blue {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    width: 4.7rem;
  }

  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white2};
  height: 1.8rem;
  line-height: 1.8rem;
  margin: 1.6rem 0 0.8rem 0;
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
  div > span {
    display: inline-block;
    font-size: 1.2em;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
    margin-right: 0.4rem;
    vertical-align: text-bottom;
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
    width: 2.5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
  }

  p.bookmark {
    background: url(${Star}) left center no-repeat;
    margin-right: 1.8rem;
  }

  p.loanCount {
    background: url(${local_library}) left center no-repeat;
  }
`;

const PlusBtn = styled.button`
  background: url(${Posting});
  width: 4.4rem;
  height: 4.4rem;
  position: fixed;
  right: 2.5rem;
  bottom: 7.6rem;
  z-index: 1;
`;

const HomeStyle = { HomeWrap, TitleBox, BookWrap, BookBox, BookTitle, BookLocation, BookPrice, BookState, PlusBtn };

export default HomeStyle;
