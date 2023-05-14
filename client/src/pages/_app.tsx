import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// Importing all the global styles & styles from ant design
import '../styles/globals.css';

import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//  PATCHFIX - Type is "AppProps" instead of any
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
