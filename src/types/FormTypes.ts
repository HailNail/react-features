export interface FormValues {
  username: string;
  email: string;
}

export interface FormState {
  errors: Partial<FormValues>;
  serverError: string | null;
  successMessage: string;
  values: FormValues;
}

export interface UserDataForm {
  id: number;
  name: string;
  role: string;
}
