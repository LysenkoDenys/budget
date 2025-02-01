'use client';

import { useContext, useEffect } from 'react';
import { AppContext, AppContextProvider } from '../providers/context'; // ✅ Import Provider
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '../components/NavBar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <ThemedContent>{children}</ThemedContent>
        </AppContextProvider>
      </body>
    </html>
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
