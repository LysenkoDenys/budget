import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { AppContext } from '../context';
import messages from './messages';
import { LOCALES } from './constants';
import { flatten } from 'flat';

export const IntlAppProvider = ({ children }) => {
  const { state } = useContext(AppContext);

  return (
    <IntlProvider
      messages={flatten(
        messages[state.locale] || messages[LOCALES.ENGLISH] || {}
      )}
      locale={state.locale}
      defaultLocale={LOCALES.ENGLISH}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlAppProvider;
