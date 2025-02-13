import { useState, useEffect, useCallback } from 'react';
import { STATUSES } from './constants';
import {
  open,
  getData,
  addItem,
  deleteItem,
  updateItem,
} from './utils/indexdb';

export const useBooleanToggle = (initialStatus = false) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = () => {
    console.log('switch state');
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
    setState({ ...state, status: STATUSES.PENDING });
    open()
      .then(() => getData(0, 20))
      .then((transactions) => {
        setState({
          ...state,
          transactions,
          status: STATUSES.SUCCESS,
          hasNextPage: true,
        });
      })
      .catch((e) => {
        setState({
          ...state,
          transactions: [],
          status: STATUSES.ERROR,
          error: e,
          hasNextPage: false,
        });
      });
  }, []);

  const loadMoreRows = useCallback(() => {
    setState({
      ...state,
      status: STATUSES.PENDING,
    });
    getData(state.transactions.length, 20)
      .then((transactions) => {
        setState({
          ...state,
          transactions: [...state.transactions, ...transactions],
          status: STATUSES.SUCCESS,
        });
      })
      .catch(() => {
        setState({
          ...state,
          hasNextPage: false,
        });
      });
  }, [state]);

  const pushTransaction = useCallback(
    (data) => {
      const transaction = {
        ...data,
        value: +data.value,
        id: Date.now(),
      };
      setState((state) => ({
        ...state,
        transactions: [transaction, ...state.transactions],
      }));
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

  return {
    ...state,
    pushTransaction,
    onDelete,
    onStarClick,
    loadMoreRows,
  };
};
