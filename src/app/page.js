'use client';
import { useState, useEffect } from 'react';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import { useData } from '../../src/hooks.js';
import { STATUSES } from '../constants';
import ChangeBalance from '../components/ChangeBalance/index';
import BalanceData from '../../src/components/BalanceData';
import TransactionsHeader from '../components/TransactionsHeader';
import ButtonAddTransaction from '../components/ButtonAddTransaction';
import { useModal } from '../hooks';
import Modal from '../components/Modal';

const Home = () => {
  const [balance, setBalance] = useState(0.0);
  const today = new Date().toISOString().substring(0, 10);

  const {
    transactions,
    hasNextPage,
    status,
    pushTransaction,
    onDelete,
    onEdit,
    onStarClick,
    loadMoreRows,
  } = useData();

  const { isModalOpen, openModal, closeModal } = useModal();

  // Update balance based on transactions
  useEffect(() => {
    setTimeout(() => {
      const dailyBalance = transactions
        .filter((el) => el.date === today)
        .reduce((sum, tx) => sum + (Number(tx.value) || 0), 0);
      setBalance(dailyBalance);
    }, 100); // Small delay to allow transactions to update
  }, [transactions, today]);

  const onSave = (transaction) => {
    pushTransaction(transaction);
    // Recalculate the balance after adding a new transaction
    const newDailyBalance = transactions
      .filter((el) => el.date === today)
      .reduce((sum, tx) => sum + (Number(tx.value) || 0), 0);
    setBalance(newDailyBalance);
  };

  const onEditTransaction = (id, updatedTransaction) => {
    onEdit(id, updatedTransaction);
    // After editing, recalculate the daily balance
    const newDailyBalance = transactions
      .filter((el) => el.date === today)
      .reduce((sum, tx) => sum + (Number(tx.value) || 0), 0);
    setBalance(newDailyBalance);
  };

  return (
    <>
      <ChangeBalance onSave={onSave} />

      <ButtonAddTransaction onClick={openModal} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} onSave={onSave} />
      )}
      {status === STATUSES.PENDING ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-rows-[10px_auto_10px] items-center justify-items-center h-full p-2 pb-20 py-20 font-[family-name:var(--font-geist-sans)]">
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
                onEdit={onEditTransaction}
                onStarClick={onStarClick}
                onAddTransaction={onSave}
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
