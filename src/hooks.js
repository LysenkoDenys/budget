import { useState, useEffect } from 'react';
import { STATUSES } from './constants';
import { open, getItems, addItem } from './utils/indexdb';

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
  });

  useEffect(() => {
    setState({ ...state, status: STATUSES.PENDING });
    open()
      .then(() => getItems())
      .then((transactions) => {
        setState({ ...state, transactions, status: STATUSES.SUCCESS });
      })
      .catch((e) => {
        setState({
          ...state,
          transactions: [],
          status: STATUSES.ERROR,
          error: e,
        });
      });
  }, []);

  return {
    ...state,
  };
};
