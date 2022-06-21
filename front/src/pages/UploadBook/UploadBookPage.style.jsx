import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioBtn = styled.input`
  flex: 1;
`;

const OptionLabel = styled.label``;

const ImageContainer = styled.div`
  flex: 1;
  height: 10rem;
  width: 100%;
`;

const UploadImg = styled.img`
  flex-basis: auto;
`;

const InputText = styled.input`
  flex: 1;
`;

const OptionText = styled.div``;

const style = { Wrapper, RadioBtn, OptionLabel, UploadImg, ImageContainer, InputText, OptionText };

export default style;
