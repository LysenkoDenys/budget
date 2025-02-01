import { getFromStorage } from '../../utils/localStorage';
import THEMES from '../themes/themeList';

const defaultContext = {
  currency: 'USD',
  themeName: getFromStorage('themeName') || THEMES.LIGHT,
  locale: 'uk-ua',
};

export default defaultContext;
