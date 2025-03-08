import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import Star from '../../../public/assets/img/star-00.svg';
import StarFilled from '../../../public/assets/img/star-01.svg';
import Image from 'next/image';

const TransactionsHeader = () => {
  const { state } = useContext(AppContext);
  return (
    <div
      className="grid items-center grid-cols-[20px_50px_60px_50px_auto_50px] 
       xs:grid-cols-[20px_70px_80px_50px_auto_50px] 
       sm:grid-cols-[30px_100px_140px_120px_auto_60px] 
       md:grid-cols-[30px_100px_180px_150px_auto_70px] 
       lg:grid-cols-[30px_100px_220px_180px_auto_80px] 
       xl:grid-cols-[30px_120px_250px_200px_auto_100px]  bg-gray-300 px-2 py-2 w-full rounded-lg shadow-lg dark:bg-gray-600 dark:text-gray-200
       sm:text-sm text-[0.55rem] mb-2"
    >
      <span className="text-center min-w-0 break-words">
        <div className="flex justify-center max-w-[20px]">
          <Image
            // onClick={() => onStarClick(id)}
            src={Star}
            // src={isStarred ? StarFilled : Star}
            alt="Star"
            width={16}
            height={16}
            className="w-5 h-5 cursor-pointer mx-auto dark:shadow-white shadow-sm rounded-full"
          />
        </div>
      </span>
      <span className="text-center min-w-0 break-words">
        {' '}
        <FormattedMessage id="header.amount" />
      </span>
      <span className="text-center min-w-0 break-words">
        {' '}
        <FormattedMessage id="header.date" />
      </span>
      <span className="text-center min-w-0 break-words">
        {' '}
        <FormattedMessage id="header.category" />
      </span>
      <span className="text-left min-w-0 break-words">
        {' '}
        <FormattedMessage id="header.comment" />
      </span>
      <span className="text-center min-w-0 break-words">
        {' '}
        <FormattedMessage id="header.actions" />
      </span>
    </div>
  );
};

export default TransactionsHeader;
