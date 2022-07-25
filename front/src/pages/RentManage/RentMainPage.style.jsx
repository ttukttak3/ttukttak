import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const TapHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const Option = styled.div`
  flex: 1;
  font-size: 1.6rem;
`;

const style = { Wrapper, TapHeader, Option };

export default style;
