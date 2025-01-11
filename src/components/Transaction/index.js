import React from 'react';

const Transaction = (props) => {
  return (
    <div>
      label:{props.transaction.label}
      <p>Value: {props.transaction.value}</p>
    </div>
  );
};

export default Transaction;
