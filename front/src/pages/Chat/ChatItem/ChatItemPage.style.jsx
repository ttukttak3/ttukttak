import styled from 'styled-components';

const Wrapper = styled.div`
  width: 34rem;
  margin: 0 auto;
`;

const MessageBox = styled.div`
  padding-top: 9.2rem;
  .messageBox {
    margin: 0;
  }

  &.hide {
    padding-top: 0;
  }
`;

const DateMessage = styled.p`
  margin: 4rem 0 2rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.$white3};

  &.hide {
    display: none;
  }
`;

const style = { Wrapper, MessageBox, DateMessage };

export default style;
