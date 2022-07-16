import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 600;
`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white1};
  background: ${({ theme }) => theme.colors.$black3Line};
`;

const SearchBtn = styled.a`
  height: 4rem;
  margin-top: 0.7rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};
  img {
    display: block;
    margin: 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    margin-bottom: 0.4rem;
  }
`;

const style = { Wrapper, SearchBar, SearchBtn };

export default style;
