import React from 'react';

const Balance = ({ balance, children }) => {
  return <div>Current balance: {balance.toFixed(2)}</div>;
};

export default Balance;
