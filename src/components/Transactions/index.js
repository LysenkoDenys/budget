import React from 'react';
import Transaction from '../Transaction';

const Transactions = ({ transactions = [] }) =>
  transactions.map((transaction) => (
    <Transaction transaction={transaction} key={transaction.id} />
  ));

export default Transactions;
