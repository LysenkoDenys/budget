import { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import Star from '../../../public/assets/img/star-00.svg';
import StarFilled from '../../../public/assets/img/star-01.svg';
import Image from 'next/image';
import { LuFilter, LuFilterX } from 'react-icons/lu';

const TransactionsHeader = ({
  onStarToggle,
  openFilterModal,
  isFilterApplied,
}) => {
  const { state } = useContext(AppContext);

  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = () => {
    const newStarred = !isStarred;
    setIsStarred(newStarred);
    onStarToggle(newStarred);
  };
  const handleFilterClick = () => {
    openFilterModal();
  };

  return (
    <div
      className="grid items-center grid-cols-[20px_50px_60px_50px_auto_25px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_20px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_25px] 
       md:grid-cols-[30px_100px_180px_150px_auto_25px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_25px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_25px]  bg-gray-300 px-2 py-2 w-full shadow-lg dark:bg-gray-600 dark:text-gray-200
       sm:text-sm text-[0.55rem] mb-2"
    >
      <span className="text-center min-w-0 break-words">
        <div className="flex justify-center max-w-[20px]">
          <Image
            onClick={handleStarClick}
            src={isStarred ? StarFilled : Star}
            alt="Star"
            width={16}
            height={16}
            className={`w-5 h-5 cursor-pointer mx-auto rounded-full hover:scale-110 ease-in-out
      shadow-sm dark:shadow-black
      ${!isStarred ? 'dark:invert dark:brightness-100 dark:filter' : ''}`}
          />
        </div>
      </span>
      <span className="text-center min-w-0 truncate">
        {' '}
        <FormattedMessage id="header.amount" />
      </span>
      <span className="text-center min-w-0 truncate">
        {' '}
        <FormattedMessage id="header.date" />
      </span>
      <span className="text-center min-w-0 truncate">
        {' '}
        <FormattedMessage id="header.category" />
      </span>
      <span className="text-center min-w-0 truncate">
        {' '}
        <FormattedMessage id="header.comment" />
      </span>
      <span className="text-center">
        <button
          onClick={handleFilterClick}
          className="p-1 cursor-pointer mx-auto rounded-full hover:scale-110 ease-in-out
    dark:text-white text-black
    shadow-sm dark:shadow-white"
          title={isFilterApplied ? 'Filters active' : 'Open filters'}
        >
          {isFilterApplied ? (
            <LuFilterX size={14} className="fill-yellow-400" />
          ) : (
            <LuFilter size={14} />
          )}
        </button>
      </span>
    </div>
  );
};

export default TransactionsHeader;
