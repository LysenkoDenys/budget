import { getFromStorage } from '../../utils/localStorage';
import THEMES from '../themes/themeList';

const defaultContext = {
  currency: 'USD',
  themeName: getFromStorage('themeName') || THEMES.LIGHT,
};

export default defaultContext;
