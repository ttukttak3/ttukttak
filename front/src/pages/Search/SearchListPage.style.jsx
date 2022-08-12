import styled from 'styled-components';

const SearchBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;

  span {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const BookList = styled.ul`
  margin-top: 1rem;
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.colors.$white3};
  text-align: center;
  font-size: 1.5rem;
  margin-top: 15rem;
`;

const style = { SearchBox, BookList, NoResult };

export default style;
