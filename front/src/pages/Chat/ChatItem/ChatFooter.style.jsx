import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 0;
  bottom: 4.8rem;
  left: 0;
  justify-content: space-between;
  height: 5.6rem;
  background: ${({ theme }) => theme.colors.$black2};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.$white1};
  background: ${({ theme }) => theme.colors.$black3};
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
