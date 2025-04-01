'use client';

import { createContext, useEffect, useReducer, useState } from 'react';
import defaultContext from './defaultContext';
import { getFromStorage, saveToStorage } from '../../utils/localStorage';
import THEMES from '../themes/themeList';
import { LOCALES } from '../i18n';

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeCurrency':
      return {
        ...state,
        currency: action.currency,
      };
    case 'reset':
      return defaultContext;
    case 'setTheme':
      saveToStorage('themeName', action.themeName);
      return {
        ...state,
        themeName: action.themeName,
      };
    case 'setLocal':
      saveToStorage('locale', action.locale);
      return {
        ...state,
        locale: action.locale || LOCALES.ENGLISH,
      };
    case 'setShowDecimals':
      saveToStorage('showDecimals', action.showDecimals);
      return {
        ...state,
        showDecimals: action.showDecimals,
      };
    default:
      throw new Error(`No action: ${action.type}`);
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const [isLoaded, setIsLoaded] = useState(false); // Track when theme is loaded
  const value = { state, dispatch };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = getFromStorage('themeName') || THEMES.LIGHT;
      dispatch({ type: 'setTheme', themeName: savedTheme });
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = getFromStorage('locale') || LOCALES.ENGLISH;
      dispatch({ type: 'setLocal', locale: savedLocale }); // ✅ Ensure locale is set
    }
  }, []);

  if (!isLoaded) return null; // Prevents hydration mismatch

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
