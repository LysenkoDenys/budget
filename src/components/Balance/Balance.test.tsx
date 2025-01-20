import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import Balance from '.';

test('should be rendered balance 100.00 with two decimals -100.00" ', () => {
  const balance = 100.0; // arrange
  act(() => render(<Balance balance={balance} />)); //act
  const formatted = screen.getByText(/Current balance: 100\.00/);
  expect(formatted).toBeInTheDocument(); //assert
});
