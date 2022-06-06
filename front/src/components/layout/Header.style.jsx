import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 6.4rem; //64px
  margin-bottom: auto;
  border-bottom: 3px solid #fff;
  text-align: left;
  width: 100%;
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

const RightBtn = styled.img`
  display: block;
  position: absolute;
  right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
  margin-top: 1.5rem;
`;

const headerStyle = { HeaderBox, Title, BackBtn, RightBtn };

export default headerStyle;
