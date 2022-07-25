import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  flex-basis: 50%;
  font-size: 1.6rem;
  font-weight: 600;
  width: 19.5rem;
  height: 20rem;
  padding: 2.8rem;
  border: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const style = { Wrapper };

export default style;
