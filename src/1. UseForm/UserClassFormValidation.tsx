import React, { Component } from 'react';

class UserClassFormValidation extends Component {
  state: Readonly<{
    username: string;
    email: string;
    errors: Partial<{
      username: string;
      email: string;
    }>;
    isSubmitting: boolean;
    serverError: string | null;
    successMessage: string;
  }> = {
    username: '',
    email: '',
    errors: {},
    isSubmitting: false,
    serverError: null,
    successMessage: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' },
      serverError: null,
    });
  };

  validateForm = () => {
    const { username, email } = this.state;
    const newErrors: Partial<{
      username: string;
      email: string;
    }> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must contain at least 3 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!email.trim().includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }

    return newErrors;
  };

  handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = this.validateForm();
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }

    this.setState({
      isSubmitting: true,
      serverErrors: null,
      successMessage: '',
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (this.state.username.toLowerCase() === 'admin') {
        throw new Error(`Username "admin" is already taken!`);
      }

      this.setState({
        isSubmitting: false,
        successMessage: 'Profile saved successfully!',
        username: '',
        email: '',
      });
    } catch (error: unknown) {
      const serverError =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : String(error);
      this.setState({
        isSubmitting: false,
        serverError,
      });
    }
  };

  render(): React.ReactNode {
    const {
      username,
      email,
      errors,
      serverError,
      isSubmitting,
      successMessage,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {serverError && (
          <div className="error">Server Error: {serverError}</div>
        )}
        {successMessage && <div className="success">{successMessage}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.handleInputChange}
            placeholder="Username"
            disabled={isSubmitting}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder="Email"
            disabled={isSubmitting}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    );
  }
}

export default UserClassFormValidation;
