import React, { useContext, useCallback, memo } from 'react';
import { AppContext } from '../../providers/context';
import Star from '../../../public/assets/img/star-00.svg';
import StarFilled from '../../../public/assets/img/star-01.svg';
import Image from 'next/image';
import { RiEditBoxLine, RiDeleteBin4Line } from 'react-icons/ri';

const Transaction = memo(({ transaction, onDelete, onStarClick, onEdit }) => {
  const { id, value, date, comment, category, isStarred } = transaction;
  const bgColor =
    value >= 0
      ? `grid grid-cols-6 items-center py-2 px-4 sm:px-6 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
      : `grid grid-cols-6 items-center py-2 px-4 sm:px-6 text-sm font-medium text-red-900 bg-red-200 rounded-lg border border-red-200 shadow-lg hover:bg-red-100 hover:text-red-700 dark:bg-red-300 dark:text-red-900 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700`;

  const { state } = useContext(AppContext);

  const deleteItem = useCallback(() => onDelete(id), [onDelete, id]);
  const editItem = useCallback(
    () => onEdit(transaction),
    [onEdit, transaction]
  );

  return (
    <div className={bgColor}>
      {/* Star Icon */}
      <div className="text-center max-w-[20px]">
        <Image
          onClick={() => onStarClick(id)}
          src={isStarred ? StarFilled : Star}
          alt="Star"
          width={16}
          height={16}
          className="w-5 h-5 cursor-pointer mx-auto dark:shadow-white shadow-sm rounded-full"
        />
      </div>
      <p className="text-right min-w-[60px]">{value}</p>
      <p className="text-center min-w-[60px] sm:min-w-[80px]">{date}</p>
      <p className="text-center min-w-[80px] sm:min-w-[100px]">{category}</p>
      <p className="text-center min-w-[120px] sm:min-w-[150px] truncate">
        {comment}
      </p>
      <div className="flex justify-center">
        <RiEditBoxLine
          className="text-2xl mr-3 cursor-pointer"
          onClick={editItem}
        />
        <RiDeleteBin4Line
          onClick={deleteItem}
          className="text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
});

export default Transaction;
