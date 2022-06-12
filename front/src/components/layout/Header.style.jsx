import styled from 'styled-components';
//이미지 위 아래 중간 위치하는 법
//감싸는 부모에게 line-height 맥이고 자식 img 태그에 vertical-align:middle
//텍스트 박스는 부모의 높이와 동일하게 맥이고 line-height를 높이 값으로 주면 중간에 위치
const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 6.4rem;
  margin-bottom: auto;
  padding: 0 2.5rem;
  //border-bottom 임의로 달아놓은 것 (아래 태그들은 6.4로 작업)
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  text-align: left;
  width: 100%;
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
`;

const BackBtn = styled.a`
  height: 6.4rem;
  line-height: 6.4rem;

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
  //border: 1px solid red;
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

const headerStyle = { HeaderBox, LeftBox, Title, BackBtn, DownBtn, RightBox, RightBtn };

export default headerStyle;
