import React from "react";

//STYLES
import "../styles/globals.scss";
import "react-phone-input-2/lib/style.css";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/styles";

import PropTypes from "prop-types";
import "../i18nextConf";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
library.add(fas);

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    if (
      !Object.getOwnPropertyNames(
        JSON.parse(localStorage.getItem("geolocation") || "{}")
      ).length
    )
      localStorage.setItem("geolocation", JSON.stringify(res.data));
    // if (!JSON.parse(localStorage.getItem("unfinished") || "{}").length)
    //   router.push("/steps/1");
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
