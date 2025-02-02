import { getFromStorage } from '../../utils/localStorage';
import { LOCALES } from '../i18n';
import THEMES from '../themes/themeList';

const defaultContext = {
  currency: 'USD',
  themeName: getFromStorage('themeName') || THEMES.LIGHT,
  locale: getFromStorage('locale') || LOCALES.ENGLISH,
};

export default defaultContext;
