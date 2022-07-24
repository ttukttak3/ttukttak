import styled from 'styled-components';

const LocationBox = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;

  //동네 list
  ul li {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    padding-bottom: 0.7rem;
    margin-top: 1.2rem;
    border-bottom: 1px solid #333;
  }
  .active {
    display: block;
  }
  .hide {
    display: none;
  }
`;

const SubmitBtn = styled.button`
  margin: 2rem 0;
  width: 34rem;
  height: 4rem;
  line-height: 4rem;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  border-radius: 0.4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.$white1};
`;

//조회 전 위치 내 근처 동네
const NearBox = styled.div`
  h2 {
    margin: 1rem 0 3rem 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
  }
`;

const style = { LocationBox, SubmitBtn, NearBox };
export default style;
