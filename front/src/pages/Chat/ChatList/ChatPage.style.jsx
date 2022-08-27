import styled from 'styled-components';

const Wrapper = styled.ul`
  width: 34rem;
  margin: 0 auto;
`;

const NoItem = styled.p`
  height: 40rem;
  line-height: 40rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
`;

const style = { NoItem, Wrapper };

export default style;
