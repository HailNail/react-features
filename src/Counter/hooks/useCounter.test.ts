import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useCounter from './useCounter';

describe('Custom useCounter hook', () => {
  test('it must return initial value: count equal 0', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("it must increase count on 1 when called 'increase'", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increase();
    });

    expect(result.current.count).toBe(1);
  });

  test("it must decrease count on 1 when called 'decrease'", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increase();
    });

    act(() => {
      result.current.decrease();
    });

    expect(result.current.count).toBe(0);
  });

  test("count can't be less than 0", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrease();
    });

    expect(result.current.count).toBe(0);
  });

  test('it must reset count to 0', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increase();
      result.current.increase();
    });

    act(() => {
      renderHook(() => {
        result.current.reset();
      });
    });

    expect(result.current.count).toBe(0);
  });
});
