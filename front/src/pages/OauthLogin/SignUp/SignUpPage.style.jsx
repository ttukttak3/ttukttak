import styled from 'styled-components';
import Perm_media from '../../../assets/img/userInterFace/Perm_media.png';

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

const ImgBox = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  margin: 0 auto 5.2rem auto;

  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 5rem;
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
  margin: 0 auto 5rem auto;
  //닉네임/이메일
  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.$white1};
    margin-bottom: 1.3rem;
  }
`;

const NickName = styled.div`
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
  }
`;

const Email = styled.div`
  p {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const SubmitBtn = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  margin-left: -17rem;
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

const style = { SignUpBox, ImgBox, ImgChangeBtn, InfoBox, NickName, Email, SubmitBtn };
export default style;
