'use client';
import { AppContext } from '../../providers/context';
import React, { useContext } from 'react';
import THEMES from '../../providers/themes/themeList';

const buttonStyle =
  'py-1 px-2 ml-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';

const ThemeSwitch = () => {
  const { state, dispatch } = useContext(AppContext);
  const setTheme = (themeName) => {
    dispatch({
      type: 'setTheme',
      themeName,
    });
    alert(themeName);
  };
  return (
    <>
      <button className={buttonStyle} onClick={() => setTheme(THEMES.LIGHT)}>
        Light
      </button>
      <button className={buttonStyle} onClick={() => setTheme(THEMES.DARK)}>
        Dark
      </button>
    </>
  );
};

export default ThemeSwitch;
