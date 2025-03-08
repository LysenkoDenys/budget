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
      ? `grid items-center grid-cols-[20px_50px_60px_50px_auto_50px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_50px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_60px] 
       md:grid-cols-[30px_100px_180px_150px_auto_70px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_80px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_100px] py-3 px-2 
       text-green-900 bg-green-200 rounded-lg border border-green-200 shadow-lg 
       hover:bg-green-100 hover:text-green-700 
       dark:bg-green-900 dark:text-green-200 dark:border-green-600 
       dark:hover:text-white dark:hover:bg-green-800`
      : `grid items-center grid-cols-[20px_50px_60px_50px_auto_50px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_50px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_60px] 
       md:grid-cols-[30px_100px_180px_150px_auto_70px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_80px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_100px] 
      py-3 px-2 bg-white rounded-lg border border-gray-200 shadow-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;

  const { state } = useContext(AppContext);

  const deleteItem = useCallback(() => onDelete(id), [onDelete, id]);
  const editItem = useCallback(
    () => onEdit(transaction),
    [onEdit, transaction]
  );

  return (
    <div className={bgColor}>
      <div className="flex justify-center max-w-[20px]">
        <Image
          onClick={() => onStarClick(id)}
          src={isStarred ? StarFilled : Star}
          alt="Star"
          width={16}
          height={16}
          className="w-5 h-5 cursor-pointer mx-auto dark:shadow-white shadow-sm rounded-full"
        />
      </div>
      <p className="text-right min-w-0 break-words whitespace-pre-wrap text-blue-500 dark:text-blue-300 sm:text-sm text-[0.7rem]">
        {new Intl.NumberFormat('uk-UA', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)}
      </p>
      <p className="text-center min-w-0 sm:text-sm text-[0.4rem]">{date}</p>
      <p className="text-left min-w-0 text-blue-500 dark:text-blue-300 sm:text-sm text-[0.7rem] truncate">
        {category}
      </p>
      <p className="text-left truncate min-w-0 sm:text-sm text-[0.7rem]">
        {comment}
      </p>
      <div className="flex justify-center">
        <RiEditBoxLine
          className="text-2xl mr-1 sm:mr-3 text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={editItem}
        />
        <RiDeleteBin4Line
          onClick={deleteItem}
          className="text-2xl cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400"
        />
      </div>
    </div>
  );
});

export default Transaction;
