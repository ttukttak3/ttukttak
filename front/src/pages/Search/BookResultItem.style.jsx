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

const BookName = styled.div`
  color: ${({ theme }) => theme.colors.$white1};
  margin: 0.5rem;
`;

const BookAuthor = styled.div`
  color: ${({ theme }) => theme.colors.$white4};
  margin: 0.5rem;
`;

const BookImg = styled.img`
  width: 8rem;
  hegith: 11.6rem;
  margin: 0.5rem;
`;

const style = { Wrapper, BookName, BookAuthor, BookImg };

export default style;
