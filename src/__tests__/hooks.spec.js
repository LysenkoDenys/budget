import { renderHook, act } from '@testing-library/react';
import { useBooleanToggle } from '../hooks';

describe('useBooleanToggle hook', () => {
  it('should handle toggle', () => {
    const { result } = renderHook(() => useBooleanToggle());
    expect(result.current.status).toBe(false);
    act(() => result.current.handleStatusChange());
    expect(result.current.status).toBe(true);
  });
});
