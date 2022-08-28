import styled from 'styled-components';

const RentListWrap = styled.div`
  width: 34rem;
`;
const NoItem = styled.div`
  min-height: 50rem;
  line-height: 50rem;
  text-align: center;
  position: relative;
  font-size: 1.6rem;
  font-weight: 400;
  color: #9aa0a6;
  img {
    position: absolute;
    top: 20rem;
    left: 50%;
    margin-left: -1.2rem;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const style = { RentListWrap, NoItem };

export default style;
