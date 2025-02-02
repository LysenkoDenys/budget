import React from 'react';
import { FormattedMessage } from 'react-intl';

const Balance = ({ balance, children }) => {
  return (
    <div>
      <FormattedMessage id="balance.balance" /> {balance.toFixed(2)}
    </div>
  );
};

export default Balance;
