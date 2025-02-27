import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';

const TransactionsHeader = () => {
  const { state } = useContext(AppContext);
  return (
    <div
      className="grid grid-cols-6 gap-1 bg-gray-500 p-1 w-full rounded-lg shadow-lg text-white 
        text-[0.5rem] sm:text-sm md:text-base"
    >
      <span className="text-center min-w-0 break-words">
        <FormattedMessage id="header.mark" />
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
