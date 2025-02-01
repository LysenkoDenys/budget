'use client';
import { AppContext } from '../../providers/context';
import React, { useContext } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import THEMES from '../../providers/themes/themeList';
import { saveToStorage } from '../../utils/localStorage';

const buttonStyle =
  'py-1 px-2 ml-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg';

const ThemeSwitch = () => {
  const { state, dispatch } = useContext(AppContext);

  const toggleTheme = () => {
    const newTheme =
      state.themeName === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    dispatch({
      type: 'setTheme',
      themeName: newTheme,
    });
    saveToStorage('themeName', newTheme);
  };
  return (
    <button className={buttonStyle} onClick={toggleTheme}>
      {/* Conditionally render the sun or moon icon based on the current theme */}
      {state.themeName === THEMES.DARK ? (
        <FiSun className="text-white" /> // Sun icon for light theme
      ) : (
        <FiMoon className="text-gray-700" /> // Moon icon for dark theme
      )}
    </button>
  );
};

export default ThemeSwitch;
