import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import formatNumber from '../../utils/formatNumber';

const Balance = ({ balance, filteredSum }) => {
  const { state } = useContext(AppContext);

  const formatValue = (value) => {
    return typeof value === 'number' && !isNaN(value)
      ? formatNumber(value, state.showDecimals, state.locale)
      : '0.00';
  };

  const valueToDisplay = filteredSum != null ? filteredSum : balance;
  const formattedValue = formatValue(valueToDisplay);
  const formattedId =
    filteredSum != null ? 'balance.balanceFiltered' : 'balance.balance';
  //
  return (
    <div className="bg-white dark:bg-gray-900 p-1 w-full flex justify-center">
      <FormattedMessage id={formattedId} /> {formattedValue} {state.currency}
    </div>
  );
};

export default Balance;
