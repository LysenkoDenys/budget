import { renderHook, act, waitFor } from '@testing-library/react';
import { useBooleanToggle, useData } from '../hooks';
import { open, getItems, addItem } from '../utils/indexdb';

jest.mock('../utils/indexdb', () => ({
  getItems: jest.fn(),
  addItem: jest.fn(),
  open: jest.fn(),
}));

describe('useBooleanToggle hook', () => {
  it('should handle toggle', () => {
    const { result } = renderHook(() => useBooleanToggle());
    expect(result.current.status).toBe(false);

    act(() => {
      result.current.handleStatusChange();
    });

    expect(result.current.status).toBe(true);
  });
});

describe('useData hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open.mockImplementation(() => Promise.resolve()); // Mock open to return a resolved Promise
    getItems.mockImplementation(() => Promise.resolve([{ value: 1 }]));
  });

  it('should get empty transactions', async () => {
    const { result } = renderHook(() => useData());

    await waitFor(() => {
      expect(result.current.transactions).toEqual([]);
    });
  });

  it('should set status to PENDING', async () => {
    const { result } = renderHook(() => useData());

    await waitFor(() => {
      expect(result.current.status).toBe('PENDING');
    });
  });

  it('should set mocked transactions', async () => {
    const { result } = renderHook(() => useData());

    await waitFor(() => {
      expect(result.current.transactions).toEqual([{ value: 1 }]);
    });
  });

  it('should set SUCCESS', async () => {
    const { result } = renderHook(() => useData());

    await waitFor(() => {
      expect(result.current.status).toBe('SUCCESS');
    });
  });
});

describe('useData hook - REJECT case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set status to ERROR and update error message on failure', async () => {
    const mockError = new Error('Failed to fetch items');
    open.mockImplementation(() => Promise.reject(mockError)); // error imitation in open

    const { result } = renderHook(() => useData());

    await waitFor(() => {
      expect(result.current.status).toBe('ERROR'); // Check the status changes to ERROR
      expect(result.current.error).toBe(mockError); // Check that error is filled
      expect(result.current.transactions).toEqual([]); // Check that transactions remain empty
    });
  });
});

describe('useData hook - onDelete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open.mockImplementation(() => Promise.resolve());
    getItems.mockImplementation(() =>
      Promise.resolve([
        { id: 1, value: 100 },
        { id: 2, value: 200 },
        { id: 3, value: 300 },
      ])
    );
  });

  it('should delete a transaction by id', async () => {
    const { result } = renderHook(() => useData());

    // Wait for transactions to be uploaded
    await waitFor(() => {
      expect(result.current.transactions).toEqual([
        { id: 1, value: 100 },
        { id: 2, value: 200 },
        { id: 3, value: 300 },
      ]);
    });

    // Invoke onDelete for transaction id 2
    act(() => {
      result.current.onDelete(2);
    });

    // Check if transaction is deleted
    expect(result.current.transactions).toEqual([
      { id: 1, value: 100 },
      { id: 3, value: 300 },
    ]);
  });
});

describe('useData hook - onStarClick', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open.mockImplementation(() => Promise.resolve());
    getItems.mockImplementation(() =>
      Promise.resolve([
        { id: 1, value: 100, isStarred: false },
        { id: 2, value: 200, isStarred: true },
        { id: 3, value: 300, isStarred: false },
      ])
    );
  });

  it('should toggle isStarred property of a transaction by id', async () => {
    const { result } = renderHook(() => useData());

    // Wait for transactions to be uploaded
    await waitFor(() => {
      expect(result.current.transactions).toEqual([
        { id: 1, value: 100, isStarred: false },
        { id: 2, value: 200, isStarred: true },
        { id: 3, value: 300, isStarred: false },
      ]);
    });

    // Invoke onStarClick for transaction id 2
    act(() => {
      result.current.onStarClick(2);
    });

    // Check if isStarred value has changed
    expect(result.current.transactions).toEqual([
      { id: 1, value: 100, isStarred: false },
      { id: 2, value: 200, isStarred: false }, // Value toggled
      { id: 3, value: 300, isStarred: false },
    ]);

    // Invoke onStarClick for transaction id 1
    act(() => {
      result.current.onStarClick(1);
    });

    // Check if value has changed for id 1
    expect(result.current.transactions).toEqual([
      { id: 1, value: 100, isStarred: true }, // Value is changed
      { id: 2, value: 200, isStarred: false },
      { id: 3, value: 300, isStarred: false },
    ]);
  });
});
