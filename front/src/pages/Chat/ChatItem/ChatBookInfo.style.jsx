import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const BookImg = styled.img`
  flex: 1;
`;

const Title = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-weight: 400;
`;

const Author = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`;

const Location = styled.div`
  font-size: 1.6rem;
`;

const Status = styled.div``;

const Price = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-weight: 400;
`;

const style = { Wrapper, BookImg, Title, Author, Location, Status, Price };

export default style;
