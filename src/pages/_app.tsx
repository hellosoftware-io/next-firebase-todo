import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "components/layout/Layout";
import UserProvider from "context/userContext";
import createEmotionCache from "lib/createEmotionCache";
import { AppProps } from "next/app";
import * as React from "react";
import theme from "theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
