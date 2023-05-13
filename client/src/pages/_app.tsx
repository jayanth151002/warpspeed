import type { AppProps } from 'next/app';
// Importing all the global styles & styles from ant design
import '../styles/globals.css';

//  PATCHFIX - Type is "AppProps" instead of any
function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
