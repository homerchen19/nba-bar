import { injectGlobal } from 'styled-components';

import { colors, fonts } from './theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  #root {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    color: ${colors.darkText};
    background: ${colors.white};
    font-family: ${fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
  }
`;
