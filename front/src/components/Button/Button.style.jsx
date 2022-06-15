import styled, { css } from 'styled-components';
const types = {
  pDefault: {
    width: '9.8rem',
    border: 'none',
  },
  pIconRight: {
    width: '11.7rem',
    border: 'none',
  },
  sDefault: {
    width: '9.8rem',
    border: '1px solid #D8D8D8',
  },
  sIconRight: {
    width: '11.7rem',
    border: '1px solid #D8D8D8',
  },
};

const typeStyles = css`
  ${({ type }) => css`
    width: ${types[type].width};
    border: ${types[type].border};
  `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-block;
  height: 3.6rem;
  line-height: 3.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1px;
  background: #26272b;
  color: #fff;
  text-align: center;

  /* 타입 */
  ${typeStyles}
`;

const buttonStyle = { StyledButton };
export default buttonStyle;
