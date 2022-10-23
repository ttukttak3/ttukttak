import styled from 'styled-components';
import arrowRight from '../../../assets/img/arrows/Keyboard_arrow_right.svg';
const GoPage = styled.div`
  width: 34rem;
  margin: 0 auto;
  ul li {
    background: url(${arrowRight}) right center no-repeat;
    border-bottom: 1px solid #5f6368;
    height: 4.8rem;
    line-height: 4.8rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: left;
  }
`;

const style = { GoPage };

export default style;
