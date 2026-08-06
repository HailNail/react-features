export interface User {
  id: number;
  name: string;
  email: string;
}

export interface DetailedUser extends User {
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
  phone: string;
  website?: string;
}
