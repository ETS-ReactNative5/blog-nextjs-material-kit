import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import ReactGA from 'react-ga';


import PageChange from "components/PageChange/PageChange.js";

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});



export default class MyApp extends App {
  
  setGA = () => {
    ReactGA.initialize('G-3HNYT51H7H');
    ReactGA.pageview('Init page view');
  };

  componentDidMount() {
    this.setGA();
    let comment = document.createComment(`created by DeQuan Sanders`


);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
           
          <title>Nala Bonae Entertainment</title>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
