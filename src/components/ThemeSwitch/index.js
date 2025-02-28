'use client';
import { AppContext } from '../../providers/context';
import React, { useContext } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import THEMES from '../../providers/themes/themeList';
import { saveToStorage } from '../../utils/localStorage';

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
    <button onClick={toggleTheme}>
      {/* Conditionally render the sun or moon icon based on the current theme */}
      {state.themeName === THEMES.DARK ? (
        <IoSunnyOutline className=" h-8 w-8 hover:scale-110 ease-in-out duration-300" />
      ) : (
        <IoMoonOutline className=" h-8 w-8 hover:scale-110 ease-in-out duration-300" />
      )}
    </button>
  );
};

export default ThemeSwitch;
