import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import formatNumber from '../../utils/formatNumber';

const Balance = ({ balance }) => {
  const { state } = useContext(AppContext);

  // Check if balance is a valid number and fallback to 0 if not
  const formattedBalance =
    typeof balance === 'number' && !isNaN(balance)
      ? formatNumber(balance, state.showDecimals, state.locale)
      : '0.00';

  return (
    <div className="bg-white dark:bg-gray-900 p-1 w-full flex justify-center">
      <FormattedMessage id="balance.balance" /> {formattedBalance}{' '}
      {state.currency}
    </div>
  );
};

export default Balance;
