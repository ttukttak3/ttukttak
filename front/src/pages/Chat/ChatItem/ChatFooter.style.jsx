import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 34rem;
  height: 5.6rem;
  bottom: 0;
  padding-top: 0.5rem;
  background: ${({ theme }) => theme.colors.$black2};
  border-top: 1px solid ${({ theme }) => theme.colors.$black3Line};

  textarea {
    overflow: hidden;
    resize: none;
    border-radius: 4px;
    padding: 1.2rem 4rem 1.2rem 1.1rem;
    width: 31.8rem;
    height: 4.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black4};
    border: 1px solid ${({ theme }) => theme.colors.$white4};
  }
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
  height: 2.4rem;
  width: 2.4rem;
  margin: 1rem 0.6rem 0;
  cursor: pointer;
`;

const SendBtn = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 1.8rem;
  width: 2.4rem;
  height: 2.4rem;

  img {
    height: 2.4rem;
    width: 2.4rem;
    margin: 1rem 0.6rem 0;
    cursor: pointer;
  }
`;

const style = { Wrapper, Input, AddBtn, SendBtn };

export default style;
