import type { AnyFunction } from '../../types/DebounceTypes';

export function debounce<F extends AnyFunction>(callback: F, delay = 300) {
  let timerId: number | null = 0;

  const debouncedFn = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ): void {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };

  debouncedFn.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debouncedFn;
}
