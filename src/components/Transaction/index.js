import React, { useContext, useCallback, memo, useState } from 'react';
import { AppContext } from '../../providers/context';
import Star from '../../../public/assets/img/star-00.svg';
import StarFilled from '../../../public/assets/img/star-01.svg';
import Image from 'next/image';
import { RiDeleteBin4Line } from 'react-icons/ri';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import formatNumber from '../../utils/formatNumber';

const Transaction = memo(({ transaction, onDelete, onStarClick, onEdit }) => {
  const { id, value, date, comment, category, isStarred } = transaction;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  const bgColor =
    value >= 0
      ? `grid items-center grid-cols-[20px_50px_60px_50px_auto_25px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_20px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_25px] 
       md:grid-cols-[30px_100px_180px_150px_auto_25px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_25px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_25px] py-3 px-2 
       text-green-900 bg-green-200 rounded-lg border border-green-200 shadow-md dark:shadow-white 
       hover:bg-green-100 hover:text-green-700 
       dark:bg-green-900 dark:text-green-200 dark:border-green-600 
       dark:hover:text-white dark:hover:bg-green-800 cursor-pointer`
      : `grid items-center grid-cols-[20px_50px_60px_50px_auto_25px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_20px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_25px] 
       md:grid-cols-[30px_100px_180px_150px_auto_25px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_25px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_25px] 
      py-3 px-2 bg-white rounded-lg border border-gray-200 shadow-md dark:shadow-white hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer`;

  const { state } = useContext(AppContext);

  const deleteItem = useCallback(() => onDelete(id), [onDelete, id]);
  const editItem = useCallback(
    () => onEdit(transaction),
    [onEdit, transaction]
  );

  return (
    <div className={bgColor} onClick={editItem}>
      <div className="flex justify-center max-w-[20px]">
        <Image
          onClick={(e) => {
            e.stopPropagation();
            onStarClick(id);
          }}
          src={isStarred ? StarFilled : Star}
          alt="Star"
          width={16}
          height={16}
          className={`w-5 h-5 cursor-pointer mx-auto rounded-full hover:scale-110 ease-in-out
            shadow-sm dark:shadow-black
            ${!isStarred ? 'dark:invert dark:brightness-100 dark:filter' : ''}`}
        />
      </div>
      <p
        className={`text-right min-w-0 break-words whitespace-pre-wrap text-blue-500 dark:text-blue-300 sm:text-sm  ${
          state.showDecimals ? `text-[0.75rem]` : `text-[0.85rem]`
        }`}
      >
        {formatNumber(value, state.showDecimals, state.locale)}
      </p>

      <p className="text-center min-w-0 sm:text-sm text-[0.4rem]">{date}</p>
      <p className="text-left min-w-0 text-blue-500 dark:text-blue-300 sm:text-sm text-[0.7rem] truncate">
        {category}
      </p>
      <p className="text-left truncate min-w-0 sm:text-sm text-[0.7rem]">
        {comment}
      </p>
      <RiDeleteBin4Line
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className="text-xl cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400"
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
});

export default Transaction;
