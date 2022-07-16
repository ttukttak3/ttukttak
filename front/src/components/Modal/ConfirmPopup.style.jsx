import styled from 'styled-components';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(23, 23, 23, 0.7);
`;
const PopupBox = styled.div`
  width: 34rem;
  height: 20rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.$white1};
  color: ${({ theme }) => theme.colors.$black1};
  cursor: pointer;
`;
const ContBox = styled.div``;
const ButtonBox = styled.div``;
const popupStyle = { Wrap, PopupBox, ContBox, ButtonBox };
export default popupStyle;
