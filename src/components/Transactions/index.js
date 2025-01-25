import React from 'react';
import Transaction from '../Transaction';

const Transactions = ({ transactions = [], onDelete }) =>
  transactions.map((transaction) => (
    <Transaction
      transaction={transaction}
      key={transaction.id}
      onDelete={onDelete}
    />
  ));

export default Transactions;
