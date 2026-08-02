import useUserForm from '../hooks/useUserForm';

const UserReact18FromValidation = () => {
  const {
    values,
    errors,
    serverError,
    isSubmitting,
    successMessage,
    handleInputChange,
    handleSubmit,
  } = useUserForm();

  return (
    <form onSubmit={handleSubmit}>
      {serverError && <div className="error">Server Error: {serverError}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleInputChange}
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
          value={values.email}
          onChange={handleInputChange}
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
};

export default UserReact18FromValidation;
