import styled from 'styled-components';

const Wrapper = styled.li`
  text-align: center;
  display: inline-block;
  position: relative;
  width: 17rem;
  height: 23rem;
  border: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const BookName = styled.p`
  width: 14rem;
  height: 4rem;
  margin: 1rem auto 0 auto;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white1};
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BookAuthor = styled.p`
  height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  margin-top: 0.8rem;
  font-size: 1.2rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.$white4};
`;

const BookImg = styled.img`
  margin-top: 2.6rem;
  width: 8rem;
  height: 11.6rem;
`;

const style = { Wrapper, BookName, BookAuthor, BookImg };

export default style;
