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

const Home = () => {
  const [balance, setBalance] = useState(0.0);
  // const [loading, setLoading] = useState(true);

  const {
    transactions,
    hasNextPage,
    status,
    pushTransaction,
    onDelete,
    onStarClick,
    loadMoreRows,
  } = useData();

  // Update balance based on transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const totalBalance = transactions.reduce((sum, tx) => sum + tx.value, 0);
      setBalance(totalBalance); // Update balance when transactions change
    }
  }, [transactions]);

  const onChange = (transaction) => {
    pushTransaction(transaction);
    setBalance(balance + +transaction.value);
  };

  return (
    <>
      <ChangeBalance onChange={onChange} />
      {status === STATUSES.PENDING ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start w-full">
            {/* <Heading />
            <ErrorBoundary fallback={<p>Something went wrong...</p>}>
              <Logo />
            </ErrorBoundary> */}
            <Balance balance={balance} />
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
