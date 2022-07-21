import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 600;
`;

const SearchBtn = styled.button`
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

const style = { Wrapper, SearchBtn };

export default style;
