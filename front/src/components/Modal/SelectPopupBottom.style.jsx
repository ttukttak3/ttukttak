import styled from 'styled-components';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
const PopupBox = styled.div`
  width: 100vw;
  height: 30rem;
  text-align: center;
  border-radius: 3rem 3rem 0 0;
  background: #fff;
  font-size: 2rem;
  color: red;
`;
const popupStyle = { Wrap, PopupBox };
export default popupStyle;
