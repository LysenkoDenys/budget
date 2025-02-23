import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BalanceData = ({ transactions, children }) => {
  const [balance, setBalance] = useState(0);
  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    if (transactions.length > 0) {
      const dailyBalance = transactions
        .filter((el) => el.date === today)
        .reduce((sum, tx) => sum + tx.value, 0);
      setBalance(dailyBalance);
    } else {
      setBalance(0);
    }
  }, [transactions, today]);

  return children(balance);
};

BalanceData.PropTypes = {
  children: PropTypes.func.isRequired,
};

export default BalanceData;
