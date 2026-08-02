import type { FormState, FormValues } from '../types/FormTypes';

const useUserForm19v = async (
  _previousState: FormState,
  formData: FormData,
) => {
  const username = String(formData.get('username')) || '';
  const email = String(formData.get('email')) || '';

  const errors: Partial<FormValues> = {};
  if (!username.trim()) {
    errors.username = 'Username is required.';
  } else if (username.trim().length < 3) {
    errors.username = 'Username must contain at least 3 characters.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!email.trim().includes('@')) {
    errors.email = 'Please provide a valid email';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      serverError: '',
      successMessage: '',
      values: { username, email },
    };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username.toLowerCase() === 'admin') {
      return {
        errors: {} as Partial<FormValues>,
        serverError: `Username "admin" is already taken!`,
        successMessage: '',
        values: { username, email },
      };
    }

    return {
      errors: {} as Partial<FormValues>,
      serverError: null,
      successMessage: 'Profile saved successfully!',
      values: { username: '', email: '' },
    };
  } catch (error: unknown) {
    const err =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : String(error);
    console.error(err);
    return {
      errors: {} as Partial<FormValues>,
      serverError: 'Something went wrong. Please try again',
      successMessage: '',
      values: { username, email },
    };
  }
};

export default useUserForm19v;
