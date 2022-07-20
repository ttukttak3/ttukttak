import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const RadioOptBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const Option = styled.div`
  flex: 1;
`;

const RadioBtn = styled.input`
  color: ${({ theme }) => theme.colors.$black4};
  background: ${({ theme }) => theme.colors.$black4};
  &:checked {
    background: ${({ theme }) => theme.colors.$primaryBlueP};
    border: 2px solid ${({ theme }) => theme.colors.$primaryBlueP};
  }
`;

const OptionLabel = styled.label`
  font-size: 1.6rem;
  text-align: left;
  font-weight: 600;
`;

const style = { Wrapper, RadioBtn, OptionLabel, RadioOptBox, Option };

export default style;
