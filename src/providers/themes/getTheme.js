import THEMES from './themelist';
import { basic, dark, light } from './themes';

export const getTheme = (themeName) => {
  switch (themeName) {
    case THEMES.DARK:
      return dark;
    case THEMES.LIGHT:
      return light;
    default:
      return basic;
  }
};
