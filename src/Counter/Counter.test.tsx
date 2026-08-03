import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Component Counter', () => {
  test('component must display initial state correctly and react on clicks', async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const countValue = screen.getByText('0');
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const resetButton = screen.getByRole('button', { name: 'reset' });

    expect(countValue).toBeInTheDocument();

    await user.click(incrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();

    await user.click(incrementButton);
    await user.click(incrementButton);

    await user.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
