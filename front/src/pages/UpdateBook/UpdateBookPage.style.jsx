import styled from 'styled-components';
import expand_more from '../../assets/img/arrows/expand_more.svg';

const Wrapper = styled.div`
  width: 34rem;
  margin: 0 auto;
  text-align: left;
`;

const ContentsBox = styled.div`
  input {
    height: 4.8rem;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};
    background-color: ${({ theme }) => theme.colors.$black3};
    color: ${({ theme }) => theme.colors.$whiteLine1};
    padding: 1.2rem 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
  textarea {
    margin-top: 2rem;
    resize: none;
    width: 34rem;
    height: 9rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};
    background-color: ${({ theme }) => theme.colors.$black3};
  }
  span {
    display: block;
    height: 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white3};
    text-align: right;
    margin: 0.8rem 0 1.7rem 0;
  }
`;

const RadioOptBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black3Line};
`;

const Option = styled.div`
  input {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    vertical-align: text-bottom;
  }
  span {
    font-size: 1.4rem;
    font-weight: 700;
    vertical-align: 0.2rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 16rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};
`;

const ImgBox = styled.button`
  height: 8.4rem;
  width: 8.4rem;
  border: 1px solid ${({ theme }) => theme.colors.$black4Line};
  border-radius: 0.5rem;
  margin: 0.7rem;

  span {
    display: block;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.$white3};
  }
`;

const UplodImgBox = styled.div`
  display: inline-block;
  position: relative;
  img {
    height: 8.4rem;
    width: 8.4rem;
    border-radius: 0.5rem;
    margin: 0.7rem;

    &.thumbnail {
      border: 1px solid ${({ theme }) => theme.colors.$white1};
    }
  }
  button {
    position: absolute;
    top: 0.1rem;
    right: 1.2rem;
    font-size: 2rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.$white1};

    &.hide {
      display: none;
    }
  }
`;

const OptionText = styled.div`
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.$whiteLine1};
  background: url(${expand_more}) center right no-repeat;
`;

const SaveButton = styled.div`
  height: 5rem;
  text-align: center;
  width: auto;
  border-radius: 0.4rem;
  line-height: 5rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1px;
  background: ${({ theme }) => theme.colors.$primaryBlueP};
  color: ${({ theme }) => theme.colors.$whiteLine1};
`;

const VerticalScrollWrapper = styled.div`
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.div`
  display: flex;
  height: 4.8rem;
  line-height: 4.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.$black4Line};
  color: ${({ theme }) => theme.colors.$whiteLine1};
  font-size: 1.4rem;
  font-weight: 600;

  p {
    margin-left: auto;
    font-size: 1.4rem;
  }
`;

const style = { Wrapper, ContentsBox, RadioOptBox, Option, ImageContainer, ImgBox, UplodImgBox, OptionText, SaveButton, VerticalScrollWrapper, Text };

export default style;
