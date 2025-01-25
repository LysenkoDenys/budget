// 'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '../components/NavBar';
import './globals.css';
import { AppContextProvider } from '../providers/context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Finance',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  const currency = {
    value: 'UAH',
    title: 'hryvna',
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <NavBar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
