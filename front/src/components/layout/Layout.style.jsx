import styled from 'styled-components';

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: auto;
  scrollbar-width: none;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.$black3};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  color: #fff;
  font-size: 2rem;
  text-align: center;
  height: auto;
  /* 섹션 내부에 푸터나 헤더가 있는 경우가 있어 헤더와 푸터에서 마진을 준다 margin: 6.4rem 0 5.6rem 0; */
  background: ${({ theme }) => theme.colors.$black3};

  &.margin {
    margin: 6.4rem 0 5.6rem 0;
  }

  &.noMargin {
    margin: 6.4rem 0 0 0;
  }
`;

const layoutStyle = { LayoutBox, Section };

export default layoutStyle;
