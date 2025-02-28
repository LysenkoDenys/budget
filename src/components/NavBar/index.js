'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { AppContext } from '../../providers/context';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import ThemeSwitch from '../../components/ThemeSwitch/index';

// Lazy load the Statistics page
const Statistics = dynamic(() => import('../../app/statistics/page'), {
  loading: () => <p>Loading Statistics...</p>,
  ssr: false, // Optional: Disable server-side rendering
});

export default function NavBar() {
  const { state } = useContext(AppContext);
  const linkTheme =
    state.themeName === 'light' ? 'text-sky-500' : 'text-red-300';

  return (
    <>
      <nav className="flex justify-between bg-slate-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <div className={linkTheme}>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '0.5rem',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link href="/">
                <FormattedMessage id="menu.home" />
              </Link>
            </li>
            <li>
              <Link href="/about">
                <FormattedMessage id="menu.about" />
              </Link>
            </li>
            <li>
              <Link href="/statistics">
                <FormattedMessage id="menu.statistics" />
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <FormattedMessage id="menu.settings" />
              </Link>
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
