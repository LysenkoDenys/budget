import { useState, useEffect, useCallback } from 'react';
import { STATUSES } from './constants';
import {
  open,
  getData,
  addItem,
  deleteItem,
  updateItem,
  getAllData,
} from './utils/indexdb';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export const useBooleanToggle = (initialStatus = false) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = () => {
    setStatus((currentStatus) => !currentStatus);
  };
  return { status, handleStatusChange };
};

export const useData = () => {
  const [state, setState] = useState({
    transactions: [],
    error: '',
    status: STATUSES.IDLE,
    hasNextPage: true,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      status: STATUSES.PENDING,
    }));

    open()
      .then(() => getData(0, 20))
      .then((transactions) => {
        setState((prevState) => ({
          ...prevState,
          transactions,
          status: STATUSES.SUCCESS,
          hasNextPage: true,
        }));
      })
      .catch((e) => {
        console.error('Error fetching data:', e);
        setState((prevState) => ({
          ...prevState,
          transactions: [],
          status: STATUSES.ERROR,
          error: e,
          hasNextPage: false,
        }));
      });
  }, []);

  const loadMoreRows = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      status: STATUSES.PENDING,
    }));

    getData(state.transactions.length, 1) // Load 1 item at a time
      .then((newTransactions) => {
        setState((prevState) => ({
          ...prevState,
          transactions: [...prevState.transactions, ...newTransactions],
          status: STATUSES.SUCCESS,
          hasNextPage: newTransactions.length > 0,
        }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          hasNextPage: false,
        }));
      });
  }, [state.transactions.length]);

  const pushTransaction = useCallback(
    (data) => {
      const transaction = {
        ...data,
        value: +data.value,
        id: Date.now(),
      };

      setState((prevState) => {
        const newTransactions = [transaction, ...prevState.transactions];
        return {
          ...prevState,
          transactions: newTransactions,
        };
      });

      addItem(transaction);
    },
    [setState]
  );

  const onDelete = useCallback(
    (id) => {
      setState((state) => ({
        ...state,
        transactions: state.transactions.filter((item) => item.id !== id),
      }));
      deleteItem(id);
    },
    [setState]
  );

  const onEdit = useCallback(
    (id, updatedData) => {
      setState((state) => {
        const updatedTransactions = state.transactions.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );

        return { ...state, transactions: updatedTransactions };
      });

      updateItem({ id, ...updatedData }); // Save changes to IndexedDB
    },
    [setState]
  );

  const onStarClick = useCallback(
    (id) => {
      const item = state.transactions.find((i) => i.id === id);

      updateItem({
        ...item,
        isStarred: !item.isStarred,
      }).then(() => {
        setState((state) => ({
          ...state,
          transactions: state.transactions.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  isStarred: !item.isStarred,
                }
          ),
        }));
      });
    },
    [setState, state]
  );

  const downloadTransactions = async () => {
    try {
      const transactions = await getAllData();

      if (!transactions.length) {
        alert('No transactions found to download.');
        return;
      }

      const dataStr = JSON.stringify(transactions, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.json';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading transactions:', error);
    }
  };

  const uploadTransactions = async (file) => {
    try {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const transactions = JSON.parse(event.target.result);

          if (!Array.isArray(transactions)) {
            alert('Invalid file format! Please upload a valid JSON file.');
            return;
          }

          // Add each transaction to IndexedDB
          transactions.forEach((transaction) => {
            addItem(transaction);
          });

          alert('Transactions uploaded successfully!');
        } catch (error) {
          console.error('Error parsing file:', error);
          alert("Error processing the file. Make sure it's a valid JSON.");
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading transactions:', error);
    }
  };

  return {
    ...state,
    pushTransaction,
    onDelete,
    onEdit,
    onStarClick,
    loadMoreRows,
    downloadTransactions,
    uploadTransactions,
  };
};
