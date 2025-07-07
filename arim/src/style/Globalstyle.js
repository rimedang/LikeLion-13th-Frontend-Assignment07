// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }
`;

export default GlobalStyle;
