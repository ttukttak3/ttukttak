import styled from 'styled-components';

const RentMainBox = styled.div`
  width: 39rem;
  margin: 0 auto;
`;

const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 34rem;
  height: 6.4rem;
  line-height: 6.4rem;
  margin: 0 auto;

  h2 {
    width: 50%;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
  }

  .on {
    border-bottom: 1px solid ${({ theme }) => theme.colors.$white1};
  }
`;

const style = { RentMainBox, TabBox };

export default style;
