'use client';
import { useState, useEffect } from 'react';
import Balance from '@/components/Balance';
import Transactions from '@/components/Transactions';
import Form from '@/components/Form';
import Logo from '@/components/Logo';
import ErrorBoundary from '@/components/ErrorBoundary';
import { open, getItems, addItem } from '../../src/utils/inexdb';

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    open()
      .then(() => getItems())
      .then((items) => {
        const totalBalance = items.reduce((sum, t) => sum + t.value, 0);
        setTransactions(items); // Set transactions as an array directly
        setBalance(totalBalance); // Set balance separately
        setLoading(false);
      })
      .catch((e) => {
        console.error('Error fetching transactions:', e);
      });
  }, [setTransactions]);

  const onChange = ({ value, date, comment }) => {
    const transaction = {
      value: +value,
      comment,
      date,
      id: Date.now(),
    };
    setTransactions([transaction, ...transactions]);
    setBalance(balance + +value);
    addItem(transaction);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <ErrorBoundary fallback={<p>Something went wrong...</p>}>
              <Logo />
            </ErrorBoundary>
            <Balance balance={balance} />
            <Form onChange={onChange} />
            <hr />
            <Transactions transactions={transactions} />
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
      )}
    </>
  );
};
export default Home;
