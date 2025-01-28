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
    act(() => result.current.handleStatusChange());
    expect(result.current.status).toBe(true);
  });
});

describe('useData hook', () => {
  beforeEach(() => {
    open.mockImplementation(() => Promise.resolve()); // Mock open to return a resolved Promise
    getItems.mockImplementation(() => Promise.resolve([{ value: 1 }]));
  });

  it('should get empty transactions', () => {
    const { result } = renderHook(() => useData());
    expect(result.current.transactions).toEqual([]);
  });

  it('should set status to PENDING', () => {
    const { result } = renderHook(() => useData());
    expect(result.current.status).toBe('PENDING');
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

//test should set REJECT
//test onDelete
//test onStarClick
