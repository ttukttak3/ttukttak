import styled from 'styled-components';
import Expand_more_gray from '../../assets/img/arrows/expand_more_gray.png';
import Posting from '../../assets/img/btn/posting.png';
//색상은 작업하면서 theme으로 달갓습니다.
const HomeWrap = styled.div`
  width: 34rem;
  margin: 0 auto;
  border: 1px solid red;
  position: relative;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid #333;
  h2 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #fff;
    margin-right: auto;
  }

  select {
    margin-top: 1.2rem;
    padding: 0px 8px;
    width: 8.1rem;
    height: 2.3rem;
    line-height: 2.3rem;
    border: 1px solid #333;
    background: url(${Expand_more_gray}) 90% center no-repeat;
    font-size: 1.2rem;
    font-weight: 400;
    color: #9aa0a6;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
  }

  select:last-child {
    margin-left: 8px;
  }
`;
const BookBox = styled.div`
  min-height: 500px;
  overflow-y: hidden;
`;

const PlusBtn = styled.button`
  background: url(${Posting});
  width: 4.4rem;
  height: 4.4rem;
  position: absolute;
  right: 2.5rem;
  bottom: 2rem;
`;
const HomeStyle = { HomeWrap, TitleBox, BookBox, PlusBtn };

export default HomeStyle;
