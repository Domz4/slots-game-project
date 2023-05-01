export interface UIDefaultProps {
  children: React.ReactNode;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  balance: number;
  token: string;
}

export type Auth = Omit<User, "passwordHash">;

export interface RegisterUserData {
  username: string;
  name: string;
  password: string;
  email: string;
}
export type LoginCredentials = Omit<RegisterUserData, "email" | "name">;
