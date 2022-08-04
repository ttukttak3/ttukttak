import styled from 'styled-components';
const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100%;
  height: 6.4rem;
  background: ${({ theme }) => theme.colors.$black3};
  &.hide {
    display: none;
  }
  &.show {
    display: flex;
  }
`;
const HeaderBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;
//왼쪽에 위치
const LeftBox = styled.div`
  margin-right: auto;
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  font-size: 2rem;
  height: 6.4rem;
  line-height: 6.4rem;
  color: ${({ theme }) => theme.colors.$white1};

  &.titleLocation {
    cursor: pointer;
  }
`;

const BackBtn = styled.a`
  height: 6.4rem;
  line-height: 6.4rem;
  a {
    width: 2.4rem;
    height: 2.4rem;
  }
  img {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
    margin-right: 0.4rem;
  }
`;

const DownBtn = styled.a`
  height: 6.4rem;
  line-height: 6.4rem;

  img {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
  }
`;

//오른쪽에 위치
const RightBox = styled.div`
  height: 6.4rem;
  line-height: 6.4rem;
  margin-left: auto;
`;

const RightBtn = styled.a`
  margin-left: 1.6rem;
  img {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
  }
  :first-child {
    margin-left: 0;
  }
`;

const RightText = styled.a`
  font-size: 2rem;
  height: 6.4rem;
  line-height: 6.4rem;
  color: #ffffff;
`;

const LocationBox = styled.div`
  position: relative;
  width: 31.2rem;
  height: 6.4rem;
  padding-top: 1.2rem;

  input {
    width: 31.2rem;
    height: 4rem;
    line-height: 4rem;
    background-color: #171717;
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    padding-left: 1.2rem;
  }
  .active {
    display: block;
  }
  .hide {
    display: none;
  }
  button {
    position: absolute;
    top: 2rem;
    right: 4.1rem;
    width: 2.4rem;
    height: 2.4rem;
  }
  button:last-child {
    right: 1rem;
  }
`;

const headerStyle = { HeaderWrap, HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn, RightText, LocationBox };

export default headerStyle;
