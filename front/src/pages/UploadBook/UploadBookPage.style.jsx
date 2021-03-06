import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioBtn = styled.input`
  flex: 1;
`;

const OptionLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
`;

const style = { Wrapper, RadioBtn, OptionLabel };

export default style;
