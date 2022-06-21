import styled from 'styled-components';
import Perm_media from '../../../assets/img/userInterFace/Perm_media.png';

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

const ImgBox = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 auto 5.2rem auto;
  background: ${({ theme }) => theme.colors.$white4};
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
  }
`;
const ImgChangeBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  background: url(${Perm_media});
  width: 2.4rem;
  height: 2.4rem;
`;
const InfoBox = styled.div`
  text-align: left;
  width: 30rem;
  margin: 0 auto;
  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
    margin-bottom: 1.3rem;
  }

  input {
    border: 1px solid ${({ theme }) => theme.colors.$white4};
    border-radius: 0.4rem;
    background: ${({ theme }) => theme.colors.$black4};
    width: 30rem;
    padding: 1.3rem 0 1.3rem 1.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.$white1};
  }
  .errorInput {
    border: 1px solid red;
  }
  span {
    display: block;
    height: 1.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$danger};
    margin: 0.8rem 0 1.7rem 0;
    letter-spacing: -0.15rem;
  }

  h6 {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const SubmitBtn = styled.button`
  margin: 19.1rem auto 0 auto;
  width: 34rem;
  height: 5rem;
  line-height: 5rem;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  border-radius: 0.4rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.$white1};
`;
const style = { ProfileBox, ImgBox, ImgChangeBtn, InfoBox, SubmitBtn };
export default style;
