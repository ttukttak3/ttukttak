import styled from 'styled-components';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(23, 23, 23, 0.7);
`;
const PopupBox = styled.div`
  width: 100vw;
  height: 23.2rem;
  text-align: center;
  border-radius: 2rem 2rem 0 0;
  background: ${({ theme }) => theme.colors.$white1};
  color: ${({ theme }) => theme.colors.$black1};
  cursor: pointer;
`;

const PopupTitle = styled.h2`
  height: 5.6rem;
  line-height: 5.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$whiteLine3};
  font-size: 1.8rem;
  font-weight: 600;
`;
const PopupContentWrap = styled.div`
  height: 21.6rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const PopupContent = styled.div`
  height: 5.2rem;
  line-height: 5.2rem;
  font-size: 1.6rem;
  font-weight: 400;
`;
const popupStyle = { Wrap, PopupBox, PopupTitle, PopupContentWrap, PopupContent };
export default popupStyle;
