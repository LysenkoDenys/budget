import { render, screen, fireEvent } from '@testing-library/react';
import Form from '.';

describe('Form component', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2025, 0, 19)); // January 19, 2025
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call onChange with the correct data when the form is submitted', () => {
    const handleChange = jest.fn();
    render(<Form onChange={handleChange} />);

    // Find input fields
    const valueInput = screen.getByPlaceholderText('Sum');
    const dateInput = screen.getByLabelText('Date');
    const commentInput = screen.getByLabelText('Comment');

    // Simulate user input
    fireEvent.change(valueInput, { target: { value: '123' } });
    fireEvent.change(dateInput, { target: { value: '2025-01-19' } });
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Assert that handleChange was called with the correct data
    expect(handleChange).toHaveBeenCalledWith({
      value: '123',
      date: '2025-01-19',
      comment: 'Test comment',
    });
  });
});
