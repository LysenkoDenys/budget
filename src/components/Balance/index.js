import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';

const Balance = ({ balance, children }) => {
  const { state } = useContext(AppContext);
  return (
    <div>
      <FormattedMessage id="balance.balance" /> {balance.toFixed(2)}{' '}
      {state.currency}
    </div>
  );
};

export default Balance;
