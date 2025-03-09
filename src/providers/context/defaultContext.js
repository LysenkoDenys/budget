import { getFromStorage } from '../../utils/localStorage';
import { LOCALES } from '../i18n';
import THEMES from '../themes/themeList';
import CURRENCY from '../themes/currencyList';

const defaultContext = {
  themeName: getFromStorage('themeName') || THEMES.LIGHT,
  locale: getFromStorage('locale') || LOCALES.ENGLISH,
  currency: getFromStorage('currency') || CURRENCY.BASIC,
  showDecimals: JSON.parse(getFromStorage('showDecimals') || 'true'),
};

export default defaultContext;
