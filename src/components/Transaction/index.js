import React from 'react';

const Transaction = ({ transaction }) => {
  return (
    <div className="bg-white border-red-700 rounded-md p-2">
      label:{transaction.label}
      <p>Value: {transaction.value}</p>
    </div>
  );
};

export default Transaction;
