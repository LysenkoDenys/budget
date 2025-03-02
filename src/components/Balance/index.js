import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';

const Balance = ({ balance }) => {
  const { state } = useContext(AppContext);

  // Check if balance is a valid number and fallback to 0 if not
  const formattedBalance =
    typeof balance === 'number' && !isNaN(balance)
      ? balance.toFixed(2)
      : '0.00';

  return (
    <div>
      <FormattedMessage id="balance.balance" /> {formattedBalance}
      {state.currency}
    </div>
  );
};

export default Balance;
