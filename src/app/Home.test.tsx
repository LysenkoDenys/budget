import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import 'fake-indexeddb/auto';
import { open, getItems, addItem } from '../utils/indexdb';

// jest.mock('../utils/indexdb', () => ({
//   getItems: jest.fn(),
//   addItem: jest.fn(),
//   open: jest.fn(),
// }));

test('show component Balance in Home with initial balance of 0', async () => {
  render(<Home />);
  const balanceElement = await screen.findByText(/current balance: 0.0/i);
  expect(balanceElement).toBeInTheDocument();
});
