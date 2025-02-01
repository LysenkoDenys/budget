import React, { useContext } from 'react';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl';
import { AppContext } from '../context';
import messages from './messages';
import { LOCALES } from './constants';

export const IntlAppProvider = ({ children }) => {
  const { state } = useContext(AppContext);
  return (
    <IntlProvider
      messages={messages[state.local]}
      locale={state.locale}
      defaultLocale={LOCALES.ENGLISH}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlAppProvider;
