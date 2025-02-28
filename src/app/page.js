'use client';
import { useState, useEffect } from 'react';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import { useData } from '../../src/hooks.js';
import { STATUSES } from '../constants';
import ChangeBalance from '../components/ChangeBalance/index';
import BalanceData from '../../src/components/BalanceData';
import TransactionsHeader from '../components/TransactionsHeader';

const Home = () => {
  const [balance, setBalance] = useState(0.0);
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
        <div className="grid grid-rows-[10px_auto_10px] items-center justify-items-center h-full p-2 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start w-full">
            <BalanceData transactions={transactions}>
              {(balance) => <Balance balance={balance} />}
            </BalanceData>
            <TransactionsHeader />
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
