import { useState } from 'react';

export const useBooleanToggle = (initialStatus = false) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = () => {
    console.log('switch state');
    setStatus((currentStatus) => !currentStatus);
  };
  return { status, handleStatusChange };
};
