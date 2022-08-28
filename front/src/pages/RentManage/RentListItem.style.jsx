import styled from 'styled-components';

const RentListWrap = styled.div`
  width: 34rem;
`;
const NoItem = styled.div`
  min-height: 50rem;
  line-height: 50rem;
  text-align: center;
  position: relative;
  font-size: 1.6rem;
  font-weight: 400;
  color: #9aa0a6;
  img {
    position: absolute;
    top: 20rem;
    left: 50%;
    margin-left: -1.2rem;
    width: 2.4rem;
    height: 2.4rem;
  }
`;
//대여 진행 중
const RentIngBox = styled.div`
  text-align: left;
  ul li {
    width: 34rem;
    margin: 0 auto;
    margin-top: 2rem;
    border: 1px solid #5f6368;
    background: #26272b;
    padding: 1.9rem 1.8rem;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
  }
  //대여현황 버튼
  button {
    margin-top: 1.2rem;
    width: 30rem;
    height: 4rem;
    line-height: 4rem;
    background: #2948ff;
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    border-radius: 0.4rem;
  }
`;
const BookBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.3rem;
  //도서 이미지
  div:first-child {
    img {
      width: 7.1rem;
      height: 10.4rem;
    }
  }
`;
//도서 정보
const BookInfo = styled.div`
  position: relative;
  width: 100%;
  margin: 1.3rem 0 0 1.4rem;

  &.booking {
    margin: 2.6rem 0 0 1.6rem;
  }

  img {
    position: absolute;
    right: 0rem;
    top: -0.4rem;

    &.return {
      right: -0.7rem;
    }
  }
  //도서 제목
  h3 {
    width: auto;
    max-width: 19rem;
    font-size: 1.6rem;
    font-weight: 400;
    color: #fff;
    line-height: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    //저자
    span {
      display: block;
      height: 1.8rem;
      margin-top: 0.4rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: #9aa0a6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  //대여일자
  h6 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #bdc1c6;
    margin: 0.6rem 0 1.5rem 0;
  }
`;
const BookPrice = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  margin-bottom: 0.8rem;

  &.booking {
    margin: 1.8rem 0 0.8rem 0;
  }

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

//예약 중
const BookingBox = styled.div`
  text-align: left;
  ul li {
    width: 34rem;
    margin: 0 auto;
    margin-top: 2rem;
    border: 1px solid #5f6368;
    background: #26272b;
    padding: 1.9rem 1.8rem;
  }
  h2 {
    position: relative;
    padding-left: 5rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    height: 1.8rem;
    //예약중 downbtn
    .bigGray {
      position: absolute;
      top: -0.3rem;
      left: 0;
      display: inline-block;
      width: 4.8rem;
      height: 1.8rem;
      line-height: 1.8rem;
      padding-left: 0.5rem;
      font-size: 1rem;
      text-align: left;
      letter-spacing: -0.06rem;
      vertical-align: middle;

      background: ${({ theme }) => theme.colors.$white4};
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
    .booking {
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }
`;

//반납 대여
const ReturnBox = styled.div`
  text-align: left;
  width: 39rem;
  margin: 0 -2.6rem;
  ul li {
    margin-top: 2rem;
    border: 1px solid #333;
  }
  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    color: #9aa0a6;
    position: relative;
    img {
      position: absolute;
      top: -0.5rem;
      right: -0.7rem;
    }
  }
  //리뷰보기 버튼
  button {
    margin-top: 1.4rem;
    width: 34rem;
    height: 4rem;
    line-height: 4rem;
    border-top: 1px solid #333;
    font-size: 1.6rem;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
`;
const PaddingBox = styled.div`
  padding: 2rem 1.9rem 2rem 3.2rem;
`;

const style = { RentListWrap, NoItem, RentIngBox, BookBox, BookInfo, BookPrice, ReturnBox, PaddingBox, BookingBox };

export default style;
