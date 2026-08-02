import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

interface FormValues {
  username: string;
  email: string;
}

const LOCAL_STORAGE_KEY = 'form_draft';

const useUserForm = () => {
  const [values, setValues] = useLocalStorage<FormValues>(
    LOCAL_STORAGE_KEY,
    {
      username: '',
      email: '',
    },
    300,
  );
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError(null);
  };

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!values.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (values.username.trim().length < 3) {
      newErrors.username = 'Username must contain at least 3 characters.';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!values.email.trim().includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);
    setSuccessMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (values.username.toLowerCase() === 'admin') {
        throw new Error(`Username "admin" is already taken!`);
      }
      setSuccessMessage('Profile saved successfully!');
      setValues({ username: '', email: '' });
    } catch (error: unknown) {
      const serverError =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : String(error);
      setServerError(serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    serverError,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
};

export default useUserForm;
