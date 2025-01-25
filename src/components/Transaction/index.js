import React, { useContext, useCallback } from 'react';
import { AppContext } from '../../providers/context';

const Transaction = ({ transaction, onDelete }) => {
  const { id, value, date, comment } = transaction;
  const bgColor =
    value >= 0
      ? `py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg`
      : `py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-900 focus:outline-none bg-red rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700 shadow-lg bg-red-200`;

  const { state } = useContext(AppContext);

  const deleteItem = useCallback(() => onDelete(id), [id]);

  return (
    <div className={bgColor}>
      <p>
        Value: {value.toFixed(2)}, {state.currency}
      </p>
      <p>Date: {date}</p>
      <p>Comment: {comment}</p>
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
};

export default Transaction;
