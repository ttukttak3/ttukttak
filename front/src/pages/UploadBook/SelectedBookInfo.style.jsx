import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 12rem;
  width: 100%;
`;

const ImgBox = styled.button`
  height: 8.4rem;
  width: 8.4rem;
  border: 1px solid ${({ theme }) => theme.colors.$black4Line};
  border-radius: 0.5rem;
  margin: 0.7rem;
`;

const UplodedImg = styled.img`
  height: 8.4rem;
  width: 8.4rem;
  border-radius: 0.5rem;
  margin: 0.7rem;
`;

const UploadImg = styled.img`
  margin-top: 0.7rem;
  flex-basis: auto;
`;

const CountImg = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.$white3};
`;

const InputText = styled.input`
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  background-color: ${({ theme }) => theme.colors.$black3};
  color: ${({ theme }) => theme.colors.$whiteLine1};
  display: flex;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 600;
`;

const Text = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  background-color: ${({ theme }) => theme.colors.$black3};
  color: ${({ theme }) => theme.colors.$whiteLine1};
  display: flex;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 600;

  dt {
    margin-left: auto;
    font-size: 1.4rem;
  }
`;

const OptionText = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
  background-color: ${({ theme }) => theme.colors.$black3};
  display: flex;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.$whiteLine1};

  img {
    margin-left: auto;
    color: #fff;
    height: 1.8rem;
  }
`;

const SaveButton = styled.div`
  height: 4rem;
  text-align: center;
  width: auto;
  border-radius: 0.5rem;
  line-height: 3.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1px;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  color: ${({ theme }) => theme.colors.$whiteLine1};
`;

const VerticalScrollWrapper = styled.div`
  overflow: scroll;
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TextArea = styled.div`
  textarea {
    margin-top: 2rem;
    resize: none;
    width: 34rem;
    height: 9rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black3};
  }
  span {
    display: block;
    height: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
    text-align: right;
    margin: 0.8rem 0 1.7rem 0;
  }
`;
const style = { Wrapper, UploadImg, UplodedImg, ImageContainer, InputText, Text, OptionText, ImgBox, SaveButton, CountImg, VerticalScrollWrapper, TextArea };

export default style;
