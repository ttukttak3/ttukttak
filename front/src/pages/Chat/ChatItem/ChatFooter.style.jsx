import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 0;
  bottom: 8rem;
  left: 0;
  justify-content: space-between;
  height: 3rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white1};
  background: ${({ theme }) => theme.colors.$black3Line};
`;

const AddBtn = styled.img`
  display: block;
  height: 2.4rem;
  weight: 2.4rem;
  margin: 1rem 0.6rem 0;
`;

const SendBtn = styled.img`
  display: block;
  height: 2.4rem;
  weight: 2.4rem;
  margin: 1rem 0.6rem 0;
`;

const style = { Wrapper, Input, AddBtn, SendBtn };

export default style;
