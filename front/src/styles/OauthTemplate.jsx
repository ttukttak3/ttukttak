import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Palette from './Palette';

/**
 * 소셜 로그인 예제 담당하는 컴포넌트
 */

/* 화면 전체를 채움 */
const OauthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${Palette.gray[2]};
  /* flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const OauthTemplate = ({ children }) => {
  return (
    <OauthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">HOME</Link>
        </div>
        {children}
      </WhiteBox>
    </OauthTemplateBlock>
  );
};

export default OauthTemplate;
