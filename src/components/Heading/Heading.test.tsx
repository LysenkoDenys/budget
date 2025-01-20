import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import Heading from '.';

test('should be rendered app name "Budget" ', () => {
  act(() => render(<Heading />));
  const nameOfApp = screen.getByText('Budget');
  expect(nameOfApp).toBeInTheDocument();
});
