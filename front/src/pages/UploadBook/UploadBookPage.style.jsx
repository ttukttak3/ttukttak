import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;
const RadioOptBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const RadioBtn = styled.input`
  flex: 1;
`;

const OptionLabel = styled.label`
  font-size: 1.6rem;
  text-align: left;
  font-weight: 600;
`;

const style = { Wrapper, RadioBtn, OptionLabel, RadioOptBox };

export default style;
