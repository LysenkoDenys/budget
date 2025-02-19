// src/app/client-layout.js (Client Component)
'use client';

import { StrictMode, useContext, useEffect, Profiler } from 'react';
import { AppContext, AppContextProvider } from '../providers/context';
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '../components/NavBar';
import './globals.css';
import { IntlAppProvider } from '../providers/i18n';

// Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ✅ Move SW registration to a separate function
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          '[Service Worker] Registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('[Service Worker] Registration failed:', error);
      });
  }
}

export default function ClientLayout({ children }) {
  useEffect(() => {
    // ✅ Register SW only on client side
    registerServiceWorker();
  }, []);

  // const onRender = (...data) => {
  //   console.log('App render data:', data);
  // };

  return (
    <StrictMode>
      {/* <Profiler id="App" onRender={onRender}> */}
      <AppContextProvider>
        <IntlAppProvider>
          <ThemedContent>{children}</ThemedContent>
        </IntlAppProvider>
      </AppContextProvider>
      {/* </Profiler> */}
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
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${state.themeName} antialiased`}
    >
      <NavBar />
      {children}
    </div>
  );
}
