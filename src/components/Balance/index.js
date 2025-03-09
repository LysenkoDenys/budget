import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';

const Balance = ({ balance }) => {
  const { state } = useContext(AppContext);

  // Check if balance is a valid number and fallback to 0 if not
  const formattedBalance =
    typeof balance === 'number' && !isNaN(balance)
      ? new Intl.NumberFormat(state.locale, {
          minimumFractionDigits: state.showDecimals ? 2 : 0,
          maximumFractionDigits: state.showDecimals ? 2 : 0,
        }).format(balance)
      : '0.00';

  return (
    <div className="bg-white dark:bg-gray-900">
      <FormattedMessage id="balance.balance" /> {formattedBalance}{' '}
      {state.currency}
    </div>
  );
};

export default Balance;
