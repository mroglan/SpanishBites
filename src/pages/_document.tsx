import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import React from 'react';
import { theme } from './_app';

declare global {
  interface Window {adsbygoogle: any;}
}

export default class MyDocument extends Document {

  componentDidMount() {
    const ads = document.getElementsByClassName('adsbygoogle').length
    for(let i = 0; i < ads; i++) {
      try {
     (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch(e) {}
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link href='https://fonts.googleapis.com/css?family=Catamaran' rel='stylesheet' />
          <script data-ad-client="ca-pub-3903271828101712" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3903271828101712"
          crossOrigin="anonymous"></script> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};