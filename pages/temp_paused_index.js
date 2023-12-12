import Head from "next/head";
import React, { useState, useEffect } from "react";

import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import Nav from "../components/nav.js";
import Authorize from "../components/authorize.js";
import Queue from "../components/queue.js";
import Notifications from "../components/notifications.js";
import Error from "../components/error.js";

// import styles from '../styles/Index.module.css'

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [canvasUrl, setCanvasUrl] = useState();
  const [apiKey, setApiKey] = useState();
  const [subTotal, setSubTotal] = useState();
  const [notifications, setNotifications] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("canvasUrl"))
      setCanvasUrl(localStorage.getItem("canvasUrl"));
    if (localStorage.getItem("apiKey"))
      setApiKey(localStorage.getItem("apiKey"));
    if (canvasUrl && apiKey) setAuthorized(true);
    if (!("Notification" in window) || Notification.permission === "granted") setNotifications(true)
  });

  // https://material.io/design/color/the-color-system.html#tools-for-picking-colors
  // https://material-ui.com/customization/color/#playground
  // https://imagecolorpicker.com/
  // https://hexcolor.co/
  const theme = createTheme({
    palette: darkMode
      ? {
        type: "dark",
        primary: {
          main: "#383434",
        },
        secondary: {
          main: "#68a7de",
        },
      }
      : {
        type: "light",
        secondary: {
          main: "#68a7de",
        },
      },
  });

  // may change Container to Box when working on nav
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Canvasser - Out of Order</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Authorize
        authorized={authorized}
        setAuthorized={setAuthorized}
        canvasUrl={canvasUrl}
        setCanvasUrl={setCanvasUrl}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
      <Nav
        authorized={authorized}
        setAuthorized={setAuthorized}
        canvasUrl={canvasUrl}
        setCanvasUrl={setCanvasUrl}
        apiKey={apiKey}
        setApiKey={setApiKey}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* <Container>

        {error ? <Error /> : null}
        {authorized && !notifications ? (
          <Notifications setNotifications={setNotifications} />
        ) : null}
        {authorized ? (
          <Queue
            canvasUrl={canvasUrl}
            apiKey={apiKey}
            subTotal={subTotal}
            setSubTotal={setSubTotal}
            error={error}
            setError={setError}
          />
        ) : (
          <></>
        )}
      </Container> */}
      <OutOfOrderMessage />
      <main>
        <h1>Canvasser</h1>
        <p>This is the main page.</p>
      </main>
    </ThemeProvider>


  );
}