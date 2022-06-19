import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  font-size: 1.6rem;
  font-weight: 600;
`;

const OptionText = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const style = { Wrapper, UploadImg, ImageContainer, InputText, OptionText };

export default style;
