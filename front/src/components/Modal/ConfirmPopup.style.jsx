import styled from 'styled-components';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba(23, 23, 23, 0.7);
`;
const PopupBox = styled.div`
  position: absolute;
  top: 50%;
  margin: -10rem auto 0 auto;
  width: 34rem;
  height: 20rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.$white1};
  color: ${({ theme }) => theme.colors.$black1};
  cursor: pointer;
`;
const ContBox = styled.div`
  height: 14.4rem;
  h2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$black1};
    line-height: 14.4rem;
    &.subTitleOn {
      padding: 5.4rem 0 0.3rem 0;
      line-height: 2.2rem;
    }
  }
  h4 {
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white4};
  }
`;
const ButtonBox = styled.div`
  height: 5.6rem;
  line-height: 5.6rem;
  border-top: 1px solid ${({ theme }) => theme.colors.$whiteLine3};
  display: flex;

  button {
    flex: 1;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$black1};
  }
  button:last-child {
    color: ${({ theme }) => theme.colors.$primaryBlueP};
    border-left: 1px solid ${({ theme }) => theme.colors.$whiteLine3};
  }
`;
const popupStyle = { Wrap, PopupBox, ContBox, ButtonBox };
export default popupStyle;
