import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import 'fake-indexeddb/auto';
import { open, getItems } from '../utils/indexdb';

jest.mock('../utils/indexdb', () => ({
  getItems: jest.fn(),
  addItem: jest.fn(),
  open: jest.fn(),
}));

describe('Home component tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls getItems and sets transactions', async () => {
    const mockTransactions = [
      { id: 1, value: 100, comment: 'Test transaction 1', date: '2023-01-01' },
      { id: 2, value: 200, comment: 'Test transaction 2', date: '2023-01-02' },
    ];

    getItems.mockResolvedValueOnce(mockTransactions);
    open.mockResolvedValueOnce();

    await act(async () => {
      render(<Home />);
    });

    expect(getItems).toHaveBeenCalled();

    const transactionElement1 = await screen.findByText(/Test transaction 1/i);
    const transactionElement2 = await screen.findByText(/Test transaction 2/i);
    expect(transactionElement1).toBeInTheDocument();
    expect(transactionElement2).toBeInTheDocument();
  });

  // test('show component Balance in Home with initial balance of 0', async () => {
  //   render(<Home />);
  //   const balanceElement = await screen.findByText(/current balance: 0.0/i);
  //   expect(balanceElement).toBeInTheDocument();
  // });
});

// expect(screen.getByRole('button')).toBeInTheDocument();
// expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
// expect(screen.getByPlaceholderText(/purpose/i)).toBeInTheDocument();
// expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
