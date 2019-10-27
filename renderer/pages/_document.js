import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    const { styleTags } = this.props;

    return (
      <html lang="en">
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/antd-mobile/dist/antd-mobile.min.css"
          />
          <style
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{__html: `
            .sticky-table .sticky-table-cell{display:table-cell;box-sizing:border-box}.sticky-table .sticky-table-row{display:table-row}.sticky-table .sticky-table-table{display:table;box-sizing:border-box}.sticky-table{position:relative;height:100%;overflow:hidden;box-sizing:border-box}.sticky-table .sticky-table-corner{z-index:4}.sticky-table .sticky-table-header{z-index:3;overflow:hidden}.sticky-table .sticky-table-column{min-height:100%}.sticky-table .sticky-table-column,.sticky-table .sticky-table-header,.sticky-table .sticky-table-corner,.sticky-table .sticky-table-x-wrapper{display:inline-block;vertical-align:top}.sticky-table .sticky-table-column.hidden,.sticky-table .sticky-table-header.hidden,.sticky-table .sticky-table-corner.hidden{display:none}.sticky-table .sticky-table-y-wrapper,.sticky-table .sticky-table-header-wrapper{white-space:nowrap}.sticky-table .sticky-table-x-wrapper,.sticky-table .sticky-table-y-wrapper{z-index:0;position:relative;-webkit-overflow-scrolling:touch;-ms-overflow-style:none}.sticky-table .sticky-table-x-wrapper{min-height:100%;width:100%;overflow-x:auto}.sticky-table .sticky-table-y-wrapper{height:100%;overflow-y:auto;margin-right:-17px;padding-right:17px}.sticky-table .sticky-table-table{overflow:visible}.sticky-table .sticky-table-table{transform:translateZ(0);-webkit-transform:translateZ(0)}.sticky-table-y-wrapper::-webkit-scrollbar,.sticky-table-x-wrapper::-webkit-scrollbar{display:none}.sticky-table .x-scrollbar,.sticky-table .y-scrollbar{position:absolute;background-color:transparent;z-index:5;overflow:auto;transform:translateZ(0);-webkit-transform:translateZ(0)}.sticky-table .x-scrollbar{left:0;bottom:0;width:100%;height:17px}.sticky-table .y-scrollbar{right:0;top:0;height:100%;width:17px}.sticky-table .x-scrollbar div{height:100%}.sticky-table .y-scrollbar div{width:100%}
            `,
            }}
          />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
