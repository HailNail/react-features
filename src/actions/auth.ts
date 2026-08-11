import { signIn } from '../api/auth';
import type { LoginState } from '../types';

export const loginAction = async (
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return {
      error: 'Email and Password are required',
      success: false,
    };
  }

  try {
    await signIn(email, password);

    return {
      error: null,
      success: true,
    };
  } catch {
    return {
      error: 'Invalid email or password',
      success: false,
    };
  }
};
