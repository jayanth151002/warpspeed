import * as React from 'react';
import type { AppProps } from 'next/app';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';



const MyApp: React.FunctionComponent = (props) => {

  return (
    // <CacheProvider value={emotionCache}>
      // <ThemeProvider theme={lightTheme}>
        // <CssBaseline />
        <React.Component {...pageProps} />
      // </ThemeProvider>
    // </CacheProvider>
  );
};

export default MyApp;
