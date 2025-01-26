import React from 'react';
import Transaction from '../Transaction';

const Transactions = ({ transactions = [], onDelete, onStarClick }) =>
  transactions.map((transaction) => (
    <Transaction
      transaction={transaction}
      onStarClick={onStarClick}
      key={transaction.id}
      onDelete={onDelete}
    />
  ));

export default Transactions;
