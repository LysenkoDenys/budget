'use client';
import { useState, useEffect } from 'react';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
// import Form from '../components/Form';
// import Logo from '../components/Logo';
// import ErrorBoundary from '../components/ErrorBoundary';
import { useData } from '../../src/hooks.js';
import { STATUSES } from '../constants';
// import Heading from '../components/Heading';
// import Modal from '../components/Modal';
import ChangeBalance from '../components/ChangeBalance/index';
import BalanceData from '../../src/components/BalanceData';

const Home = () => {
  const [balance, setBalance] = useState(0.0);
  // const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().substring(0, 10);

  const {
    transactions,
    hasNextPage,
    status,
    pushTransaction,
    onDelete,
    onStarClick,
    loadMoreRows,
  } = useData();

  console.log(new Date().toISOString().substring(0, 10)); //
  // Update balance based on transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const dailyBalance = transactions
        .filter((el) => el.date === today)
        .reduce((sum, tx) => sum + tx.value, 0);
      setBalance(dailyBalance); // Update balance when transactions change
    }
  }, [transactions, today]);

  const onChange = (transaction) => {
    pushTransaction(transaction);
    // setBalance(balance + +transaction.value);
  };

  return (
    <>
      <ChangeBalance onChange={onChange} />
      {status === STATUSES.PENDING ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-2 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start w-full">
            {/* <Heading />
            <ErrorBoundary fallback={<p>Something went wrong...</p>}>
              <Logo />
            </ErrorBoundary> */}
            <BalanceData transactions={transactions}>
              {(balance) => <Balance balance={balance} />}
            </BalanceData>
            {/* Responsive Table Header */}
            <div
              className="grid grid-cols-6 gap-2 bg-gray-500 p-2 w-full rounded-lg shadow-lg text-white 
                text-[0.5rem] sm:text-sm md:text-base"
            >
              <span className="text-center min-w-0 break-words">Mark</span>
              <span className="text-center min-w-0 break-words">Amount</span>
              <span className="text-center min-w-0 break-words">Date</span>
              <span className="text-center min-w-0 break-words">Category</span>
              <span className="text-left min-w-0 break-words">Comment</span>
              <span className="text-center min-w-0 break-words">Action</span>
            </div>

            {status === STATUSES.SUCCESS && transactions.length > 0 && (
              <Transactions
                data={transactions}
                isNextPageLoading={status === STATUSES.PENDING}
                hasNextPage={hasNextPage}
                loadMoreRows={loadMoreRows}
                onDelete={onDelete}
                onStarClick={onStarClick}
              />
            )}
            {/* Handle empty transactions */}
            {status === STATUSES.SUCCESS && transactions.length === 0 && (
              <div>No transactions available</div>
            )}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
      )}
    </>
  );
};
export default Home;
