'use client';
import { AppContext } from '../../providers/context';
import React, { useContext } from 'react';

const buttonStyle =
  'py-1 px-2 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg';

const ThemeSwitch = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <button className={buttonStyle}>Light</button>
      <button className={buttonStyle}>Dark</button>
    </>
  );
};

export default ThemeSwitch;
