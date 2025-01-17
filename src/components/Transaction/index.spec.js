import React from 'react';
import Transaction from './index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Transaction component', () => {
  let mockTransaction;

  beforeEach(() => {
    mockTransaction = {
      value: 100,
      date: '2025-01-01',
      comment: 'Test transaction',
    };
  });

  it('should show transaction', () => {
    const { asFragment } = render(
      <Transaction transaction={mockTransaction} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not show 2 zeros after amount', () => {
    const { asFragment } = render(
      <Transaction transaction={mockTransaction} />
    );
    expect(screen.getByText('Value: 100.00')).toBeInTheDocument();
  });
});
