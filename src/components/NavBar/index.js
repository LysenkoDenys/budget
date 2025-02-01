'use client';

import { useContext } from 'react';
import { AppContext } from '../../providers/context';

import Link from 'next/link';
import ThemeSwitch from '../../components/ThemeSwitch/index';

export default function NavBar() {
  const { state } = useContext(AppContext);
  const linkTheme =
    state.themeName === 'light' ? 'text-sky-500' : 'text-red-300';

  return (
    <>
      <nav className="flex justify-between bg-slate-100 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <div className={linkTheme}>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1rem',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/statistics">Statistics</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <div className="flex wrap ">
          <ThemeSwitch />
        </div>
      </nav>
    </>
  );
}
