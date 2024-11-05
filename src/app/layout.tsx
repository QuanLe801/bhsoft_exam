'use client';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from '@/app/container/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <Header />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
