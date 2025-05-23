'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { AppContext } from '../../providers/context';
import Link from 'next/link';
import ThemeSwitch from '../../components/ThemeSwitch/index';
import Spinner from '../Spinner';

import {
  IoSettingsOutline,
  IoInformationCircleOutline,
  IoHomeOutline,
  IoBarChartOutline,
} from 'react-icons/io5';

// Lazy load the Statistics page
const Statistics = dynamic(() => import('../../app/statistics/page'), {
  loading: () => <Spinner />,
  ssr: false, // Optional: Disable server-side rendering
});

export default function NavBar() {
  const { state } = useContext(AppContext);

  return (
    <>
      <nav className="w-full fixed top-0 left-0 flex bg-slate-100 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-md z-50">
        <ul className="w-full flex justify-around items-center gap-6">
          <li>
            <Link href="/">
              <IoHomeOutline
                title="home"
                className="h-6 w-6 hover:scale-110 ease-in-out duration-300"
              />
            </Link>
          </li>
          <li>
            <Link href="/about">
              <IoInformationCircleOutline
                title="about"
                className="h-6 w-6 hover:scale-110 ease-in-out duration-300"
              />
            </Link>
          </li>
          <li>
            <Link href="/statistics">
              <IoBarChartOutline
                title="statistics"
                className="h-6 w-6 hover:scale-110 ease-in-out duration-300"
              />
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <IoSettingsOutline
                title="settings"
                className="h-6 w-6 hover:scale-110 ease-in-out duration-300"
              />
            </Link>
          </li>
          <li>
            <ThemeSwitch title="theme switcher" />
          </li>
        </ul>
      </nav>
    </>
  );
}
