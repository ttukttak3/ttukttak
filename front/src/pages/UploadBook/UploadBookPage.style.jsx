import styled from 'styled-components';
import radio from '../../assets/img/btn/radioBtn.svg';
import radioCheck from '../../assets/img/btn/radioBtnCheck.svg';

const Wrapper = styled.div`
  width: 34rem;
  margin: 0 auto;
`;

const RadioOptBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 4.8rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const Option = styled.div`
  flex: 1;
  text-align: left;

  input[type='radio'] {
    display: none;
  }
  label {
    font-size: 1.4rem;
    font-weight: 700;
  }
  &:last-child label {
    margin-left: 1.5rem;
  }
  input[type='radio'] + label {
    display: inline-block;
    height: 4.8rem;
    line-height: 4.8rem;
    padding-left: 3rem;
    background: url(${radio}) center left no-repeat;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background: url(${radioCheck}) center left no-repeat;
  }
`;

const style = { Wrapper, RadioOptBox, Option };

export default style;
