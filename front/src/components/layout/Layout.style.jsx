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
  background: ${({ theme }) => theme.colors.$black3};
  /* 섹션 내부에 푸터나 헤더가 있는 경우가 있어 클래스로 제어한다. */
  &.marginTB {
    padding: 6.4rem 0 5.6rem 0;
  }

  &.marginT {
    padding: 6.4rem 0 0 0;
  }

  &.marginB {
    padding: 0 0 5.6rem 0;
  }

  &.noMargin {
    padding: 0;
  }
`;

const layoutStyle = { LayoutBox, Section };

export default layoutStyle;
