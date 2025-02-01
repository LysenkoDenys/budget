import React, { useContext, useCallback } from 'react';
import { AppContext } from '../../providers/context';
import Star from '../../../public/assets/img/star-00.svg';
import StarFilled from '../../../public/assets/img/star-01.svg';
import Image from 'next/image';

const Transaction = ({ transaction, onDelete, onStarClick }) => {
  const { id, value, date, comment, isStarred } = transaction;
  const bgColor =
    value >= 0
      ? `py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg flex w-full justify-between`
      : `py-2 px-5 me-2 text-sm font-medium text-red-900 focus:outline-none bg-red rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-300 dark:text-red-900 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700 shadow-lg bg-red-200 flex w-full justify-between`;

  const { state } = useContext(AppContext);

  const deleteItem = useCallback(() => onDelete(id), [id]);

  return (
    <div className={bgColor}>
      <Image
        onClick={() => onStarClick(id)}
        src={isStarred ? StarFilled : Star}
        alt="Unfilled Star"
        className="w-5 h-5 cursor-pointer mx-1 dark:shadow-white shadow-sm rounded-full"
      />
      <p>
        Value: {value.toFixed(2)}, {state.currency}
      </p>
      <p>Date: {date}</p>
      <p>Comment: {comment}</p>
      <button
        onClick={deleteItem}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 mt-1 border border-blue-500 hover:border-transparent rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default Transaction;
