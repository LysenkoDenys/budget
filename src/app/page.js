'use client';
import { useState, useEffect } from 'react';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import Form from '../components/Form';
import Logo from '../components/Logo';
import ErrorBoundary from '../components/ErrorBoundary';
import { useData } from '../../src/hooks.js';
import { STATUSES } from '../constants';
import Heading from '../components/Heading';

const Home = () => {
  const [balance, setBalance] = useState(0.0);
  const [loading, setLoading] = useState(true);

  const { transactions, status, pushTransaction, onDelete, onStarClick } =
    useData();

  useEffect(() => {
    setLoading(false);
  }, [transactions]);

  const onChange = (transaction) => {
    pushTransaction(transaction);
    setBalance(balance + +transaction.value);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
            <Heading />
            <ErrorBoundary fallback={<p>Something went wrong...</p>}>
              <Logo />
            </ErrorBoundary>
            <Balance balance={balance} />
            <Form onChange={onChange} />
            <hr />
            {status === STATUSES.PENDING ? (
              <div className="">Loading...</div>
            ) : null}
            {status === STATUSES.SUCCESS ? (
              <Transactions
                transactions={transactions}
                onDelete={onDelete}
                onStarClick={onStarClick}
              />
            ) : null}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
      )}
    </>
  );
};
export default Home;
