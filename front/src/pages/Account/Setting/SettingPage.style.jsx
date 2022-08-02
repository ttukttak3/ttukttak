import styled from 'styled-components';
import KeyboardArrowUp from '../../../assets/img/arrows/Keyboard_arrow_up.png';
import ExpandMore from '../../../assets/img/arrows/expand_more.svg';

const SettingBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;

  ul {
    margin-bottom: 4rem;
  }
  li {
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    padding-bottom: 1.1rem;
    margin-top: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  }
  h2 {
    margin: 2rem 0 2.7rem 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
  }
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const VersionBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const FAQBox = styled.div`
  ul li {
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    letter-spacing: -0.15rem;
    line-height: 2.2rem;
    padding: 0 2rem 1rem 0;
    margin-top: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
    background: url(${ExpandMore}) right 0.25rem no-repeat;
    &.active {
      background: url(${KeyboardArrowUp}) right 0.25rem no-repeat;
    }
  }
  //답글
  li:nth-child(2n) {
    display: none;
    margin-top: 1.2rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.8rem;
    padding-right: 0;
    color: ${({ theme }) => theme.colors.$white2};
    word-break: break-all;
    border-bottom: none;
    background: none;

    &.active {
      display: block;
      background: none;
    }
  }
`;

const NoticeBox = styled.div`
  li {
    width: 34rem;
    height: auto;
    padding: 2rem 0 0.8rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};

    h4 {
      font-size: 1.6rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.$white1};
      line-height: 2.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p {
      margin-top: 1rem;
      font-size: 1.4rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.$white3};
    }
  }
  .noList {
    border-bottom: none;
    padding: 0;
    height: 73rem;
    text-align: center;
    margin: 0 auto;
  }
`;

//서비스 이용약관
const ServiceBox = styled.div`
  margin-bottom: 3rem;
  h2 {
    margin-top: 3rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};

    :first-child {
      margin-top: 0;
    }
  }
  p {
    margin-top: 1.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.9rem;
    word-break: break-all;
    text-align: justify;
    color: ${({ theme }) => theme.colors.$white2};
  }
  ol li {
    margin: 1.5rem 0;
    list-style-position: inside;
    list-style-type: decimal;
    text-indent: -2rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.9rem;
    word-break: break-all;
    text-align: justify;
    color: ${({ theme }) => theme.colors.$white2};
  }
  span {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white2};
    text-decoration: underline;
  }
  ul li {
    margin-top: 1.5rem;
    list-style-position: inside;
    list-style-type: disc;
    text-indent: -2rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    font-weight: 400;
    word-break: break-all;
    text-align: justify;
    color: ${({ theme }) => theme.colors.$white2};
  }
`;
//고객 정보 처리 방침
const CustomerBox = styled.div`
  margin-bottom: 3rem;
  p {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: -0.15rem;
    word-break: break-all;
    text-align: justify;
    color: ${({ theme }) => theme.colors.$white2};

    :first-child {
      margin-top: 0;
    }
  }
  ol li {
    margin: 1.2rem 0;
    list-style-position: inside;
    list-style-type: decimal;
    text-indent: -2rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: -0.15rem;
    word-break: break-all;
    text-align: justify;
    color: ${({ theme }) => theme.colors.$white2};
  }
  ul li {
    margin-top: 1.2rem;
    list-style-position: inside;
    list-style-type: disc;
    text-indent: -2rem;
    padding-left: 2rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: -0.15rem;
    word-break: break-all;
    text-align: left;
    color: ${({ theme }) => theme.colors.$white2};
    ul li {
      list-style-type: circle;
    }
  }
  h4 {
    margin-top: 3rem;
    word-break: break-all;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.15rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
  }
  table {
    border: 1px solid ${({ theme }) => theme.colors.$white2};
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.colors.$white2};
  }
  th {
    vertical-align: middle;
    padding: 0.5rem;
    border-right: 1px solid ${({ theme }) => theme.colors.$white2};
    text-align: center;
    font-size: 1.3rem;
    line-height: 1.6rem;
    :last-child {
      border-right: none;
    }
  }
  td {
    vertical-align: middle;
    padding: 1rem 0.5rem;
    border-right: 1px solid ${({ theme }) => theme.colors.$white2};
    border-top: 1px solid ${({ theme }) => theme.colors.$white2};
    font-size: 1.3rem;
    line-height: 1.8rem;
    letter-spacing: -0.15rem;
    word-break: break-all;
    text-align: center;
    :last-child {
      border-right: none;
    }
  }
`;
const style = { SettingBox, VersionBox, ContentsBox, FAQBox, NoticeBox, ServiceBox, CustomerBox };
export default style;
