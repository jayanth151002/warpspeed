import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// Importing all the global styles & styles from ant design
import '../styles/globals.css';
import store from '../redux/store';

//  PATCHFIX - Type is "AppProps" instead of any
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  )
}

export default MyApp;
