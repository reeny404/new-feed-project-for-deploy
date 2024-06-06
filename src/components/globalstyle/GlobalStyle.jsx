//src>components>globalstyle>GlobalStyle.jsx

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    background-color: black;
  }
    `;

export default GlobalStyle;
