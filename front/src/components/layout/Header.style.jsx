import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 6.4rem; //64px
  margin-bottom: auto;
  border-bottom: 3px solid #fff;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 2rem;
  height: 3rem;
  line-height: 3rem;
  margin-top: 1.5rem;
  color: #fff;
`;

const BackBtn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  margin-top: 1.5rem;
  margin-bottom: 0.4rem;
`;

const headerStyle = { HeaderBox, Title, BackBtn };

export default headerStyle;
