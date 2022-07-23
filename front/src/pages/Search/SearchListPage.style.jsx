import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.$black1};
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white1};
  background: ${({ theme }) => theme.colors.$black1};
`;

const SearchBtn = styled.a`
  height: 4rem;
  margin-top: 0.7rem;
  margin-left: auto;
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

const BackBtn = styled.a`
  height: 4rem;
  margin-top: 0.7rem;
  margin-right: auto;
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

const ClearBtn = styled.a`
  height: 4rem;
  margin-top: 0.7rem;
  margin-right: auto;
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

const BookList = styled.li`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
  font-size: 2rem;
`;

const SearchResult = styled.div`
  margin-right: auto;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.$white3};
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.colors.$white3};
  margin: auto;
  font-size: 1.5rem;
  margin-top: 15rem;
`;

const style = { Wrapper, SearchBarWrapper, SearchBar, SearchBtn, ClearBtn, SearchResult, BookList, NoResult, BackBtn };

export default style;
