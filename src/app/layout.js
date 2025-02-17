'use client';

import { StrictMode, useContext, useEffect, Profiler } from 'react';
import { AppContext, AppContextProvider } from '../providers/context';
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '../components/NavBar';
import './globals.css';
import { IntlAppProvider } from '../providers/i18n';
import { IntlProvider } from 'react-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const onRender = (...data) => {
    console.log(data);
  };
  return (
    <StrictMode>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Profiler id="App" onRender={onRender}>
            <AppContextProvider>
              <IntlAppProvider>
                <ThemedContent>{children}</ThemedContent>
              </IntlAppProvider>
            </AppContextProvider>
          </Profiler>
        </body>
      </html>
    </StrictMode>
  );
}

function ThemedContent({ children }) {
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(state.themeName);
    }
  }, [state.themeName]);

  return (
    <div className={state.themeName}>
      <NavBar />
      {children}
    </div>
  );
}
