import styled from 'styled-components';

const RentListWrap = styled.div`
  width: 39rem;
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
    margin-top: 2rem;
    border: 1px solid #5f6368;
    background: #26272b;
    padding: 2rem 2.5rem;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
  }
  //대여현황 버튼
  button {
    margin-top: 1.4rem;
    width: 34rem;
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
  margin-top: 1.4rem;
  //도서 이미지
  div:first-child {
    img {
      width: 8rem;
      height: 11.6rem;
    }
  }
`;
//도서 정보
const BookInfo = styled.div`
  position: relative;
  width: 24.3rem;
  margin: 1.5rem 0 0 1.6rem;

  &.booking {
    margin: 2.6rem 0 0 1.6rem;
  }

  img {
    position: absolute;
    right: 0rem;
    top: -0.4rem;
  }
  //도서 제목
  h3 {
    width: auto;
    max-width: 23rem;
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
      margin-top: 0.4rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: #9aa0a6;
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
//반납 대여
const ReturnBox = styled.div`
  text-align: left;
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
      right: 0;
    }
  }
  //리뷰보기 버튼
  button {
    margin-top: 1.4rem;
    width: 39rem;
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
  padding: 2rem 2.5rem;
`;

//예약 중
const BookingBox = styled.div`
  text-align: left;
  ul li {
    margin-top: 2rem;
    border: 1px solid #333;
    background: #1c1c1c;
    padding: 2.2rem 3.1rem;
  }
  h2 {
    position: relative;
    padding-left: 5.8rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    height: 1.8rem;
    //예약중 downbtn
    .bigGray {
      position: absolute;
      top: -0.2rem;
      left: 0;
      background: ${({ theme }) => theme.colors.$white4};
      padding-left: 0.4rem;
      width: 4.8rem;
      height: 1.8rem;
      line-height: 1.8rem;
      font-size: 1rem;
      font-weight: 400;
      color: #fff;
      text-align: left;
    }
    .booking {
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }
`;

const style = { RentListWrap, RentIngBox, BookBox, BookInfo, BookPrice, ReturnBox, PaddingBox, BookingBox };

export default style;
