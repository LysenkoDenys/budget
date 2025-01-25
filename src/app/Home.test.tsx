import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import 'fake-indexeddb/auto';
import { open, getItems, addItem } from '../utils/indexdb';

jest.mock('../utils/indexdb', () => ({
  getItems: jest.fn(),
  addItem: jest.fn(),
  open: jest.fn(),
}));

describe('Home component tests', () => {
  test('show component Balance in Home with initial balance of 0', async () => {
    open.mockResolvedValueOnce();
    getItems.mockResolvedValueOnce([]);

    await act(async () => {
      render(<Home />);
    });

    const balanceElement = await screen.findByText(/current balance: 0.0/i);
    expect(balanceElement).toBeInTheDocument();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //=========================================================

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

  //NEGATIVE SCENARIO:============================================

  describe('Home component error handling tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('handles error when getItems fails', async () => {
      open.mockResolvedValueOnce();
      getItems.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await act(async () => {
        render(<Home />);
      });

      const loadingElement = screen.getByText(/loading/i);
      expect(loadingElement).toBeInTheDocument();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching transactions:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });
  describe('When transaction is added', () => {
    it('should update the balance and add transaction', async () => {
      open.mockResolvedValueOnce();
      getItems.mockResolvedValueOnce([]);

      await act(async () => {
        render(<Home />);
      });

      const balanceElement = screen.getByText(/current balance: 0.0/i);
      expect(balanceElement).toBeInTheDocument();

      // Find the inputs and the submit button in the form
      const valueInput = screen.getByLabelText(/sum/i); // Ensure your input has an accessible label
      const commentInput = screen.getByLabelText(/comment/i); // Ensure your input has an accessible label
      const dateInput = screen.getByLabelText(/date/i);
      const submitButton = screen.getByRole('button', { name: /save/i });

      // Simulate user input and form submission
      fireEvent.change(valueInput, { target: { value: '100' } });
      fireEvent.change(commentInput, { target: { value: 'Test comment' } });
      fireEvent.change(dateInput, { target: { value: '2023-01-01' } });

      fireEvent.click(submitButton);

      // Check that the balance updates
      const updatedBalanceElement = await screen.findByText(
        /current balance: 100/i
      );
      expect(updatedBalanceElement).toBeInTheDocument();

      // Check that the new transaction is displayed
      const transactionElement = await screen.findByText(/Test comment/i);
      expect(transactionElement).toBeInTheDocument();

      // Ensure `addItem` is called
      expect(addItem).toHaveBeenCalledWith({
        id: expect.any(Number),
        value: 100,
        comment: 'Test comment',
        date: '2023-01-01',
      });
    });
  });
});

// expect(screen.getByRole('button')).toBeInTheDocument();
// expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
// expect(screen.getByPlaceholderText(/purpose/i)).toBeInTheDocument();
// expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
