import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BalanceData = ({ children }) => {
  const [balance, setBalance] = useState(12);
  return children(balance);
};

BalanceData.PropTypes = {
  children: PropTypes.func.isRequired,
};

export default BalanceData;
