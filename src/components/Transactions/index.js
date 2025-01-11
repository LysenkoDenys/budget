import React from 'react';
import Transaction from '../Transaction';

const Transactions = (props) => {
  return (
    <div>
      {' '}
      {props.transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
    </div>
  );
};

export default Transactions;
