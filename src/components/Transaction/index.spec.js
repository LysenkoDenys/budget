import React from 'react';
import Transaction from '.';
import { render } from '@testing-library/react';

describe('Transaction component', () => {
  it('should show transaction', () => {
    const mockTransaction = {
      value: 100,
      date: '2025-01-01',
      comment: 'Test transaction',
    };
    const { asFragment } = render(
      <Transaction transaction={mockTransaction} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
