export type AnyFunction = (...args: unknown[]) => unknown;

export interface DebouncedFunction<F extends AnyFunction> {
  (...args: Parameters<F>): void;
  cancel: () => void;
}
