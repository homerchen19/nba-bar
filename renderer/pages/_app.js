import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import isOnline from 'is-online';

import { Offline } from '@components/shared';
import GlobalStyle from '@styles/global';
import configureStore from '../store';

export default withRedux(configureStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
        online: await isOnline(),
      };
    }

    render() {
      const { Component, pageProps, store, online } = this.props;

      return (
        <>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
            />
            <title>NBA Bar</title>
          </Head>
          <Provider store={store}>
            <>
              <GlobalStyle />
              {online ? <Component {...pageProps} /> : <Offline />}
            </>
          </Provider>
        </>
      );
    }
  }
);
