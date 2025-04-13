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
import Spinner from '../components/Spinner';
import FilterModal from '../components/FilterModal/FilterModal';

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

  const { isModalOpen, openModal, closeModal, modalType } = useModal();

  const [filters, setFilters] = useState({
    starOnly: false,
  });

  const onStarToggle = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      starOnly: value,
    }));
  };

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

  const openFilterModal = () => {
    openModal('filter');
  };

  const onApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <ChangeBalance onSave={onSave} />

      <ButtonAddTransaction onClick={() => openModal('addTransaction')} />
      {isModalOpen && modalType === 'filter' && (
        <FilterModal
          onClose={closeModal}
          onApplyFilter={onApplyFilter}
          currentFilters={filters}
          isOpen={isModalOpen}
        />
      )}

      {isModalOpen && modalType === 'addTransaction' && (
        <Modal isOpen={isModalOpen} onClose={closeModal} onSave={onSave} />
      )}
      {status === STATUSES.PENDING && navigator.onLine ? (
        <Spinner />
      ) : (
        <div className="grid grid-rows-[10px_auto_10px] items-center justify-items-center h-full p-2 pb-2 pt-10 font-[family-name:var(--font-geist-sans)]">
          <div className="sticky top-[40px] z-40 w-full flex flex-col justify-center items-center">
            <BalanceData transactions={transactions}>
              {(balance) => <Balance balance={balance} />}
            </BalanceData>
            <TransactionsHeader
              onStarToggle={onStarToggle}
              openFilterModal={openFilterModal}
              className="sticky top-[100px] z-30 w-full"
            />
          </div>

          <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start w-full mt-16">
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
                filters={filters}
              />
            )}
            {/* Handle empty transactions */}
            {status === STATUSES.SUCCESS && transactions.length === 0 && (
              <div className="flex items-center justify-center h-full w-full text-center">
                No transactions available
              </div>
            )}
          </main>
          <footer className="row-start-3 flex gap-0 flex-wrap items-center justify-center"></footer>
        </div>
      )}
    </>
  );
};
export default Home;
