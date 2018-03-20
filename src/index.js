import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { WingBlank, WhiteSpace } from 'antd-mobile';

import theme from './styles/theme';
import './styles/global';
import configureStore from './store';
import App from './containers/App';

const store = configureStore();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Fragment>
          <WhiteSpace />
          <WingBlank>
            <App />
          </WingBlank>
        </Fragment>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
