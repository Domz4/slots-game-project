export interface UIDefaultProps {
  children: React.ReactNode;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface Auth {
  token: string;
  username: string;
  name: string;
}
export interface RegisterUserData {
  username: string;
  name: string;
  password: string;
  email: string;
}
export type LoginCredentials = Omit<RegisterUserData, "email" | "name">;
