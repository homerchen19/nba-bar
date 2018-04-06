import { injectGlobal } from 'styled-components';

import { colors, fonts } from './theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    background: ${colors.white};
    color: ${colors.darkText};
    font-family: ${fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
  }
`;
