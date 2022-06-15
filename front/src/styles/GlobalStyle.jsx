import { createGlobalStyle } from 'styled-components';
//reset.css 내용 추가
const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video,
    input, button {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 62.5%;
        /*
            rem 계산을 위해 폰트의 사이즈는 62.5% 로 적용한다. 
            font-size: 10px = 62.5%
            10px : 1rem / 12px : 1.2rem / 14px : 1.4rem / 20px : 2rem
        */
        font-family: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'Pretendard';
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    button{
        cursor: pointer;
    }
`;

export default GlobalStyle;
