import { injectGlobal } from 'styled-components';
import { colors, fonts } from './theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${colors.darkText};
    font-family: ${fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
  }
`;
