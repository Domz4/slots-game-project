import axios from "axios";
import { User, Auth, LoginCredentials, RegisterUserData } from "../types";
import urlJoin from "url-join";

const baseURL = "http://localhost:3001";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = newToken;
};
export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post<Auth>(urlJoin(baseURL, "api/login"), credentials);

  return response.data;
};

export const register = async (userData: RegisterUserData) => {
  const response = await axios.post<User>(urlJoin(baseURL, "api/users"), userData);
  return response.data;
};

export const addBalance = async (amount: number) => {
  const response = await axios.put<User>(
    urlJoin(baseURL, "api/balance"),
    { amount },
    { headers: { Authorization: `bearer ${token}` } }
  );
  return response.data;
};

export const gameOutcome = async (betAmount: number) => {
  const response = await axios.post(
    urlJoin(baseURL, "api/slots/play"),
    { betAmount },
    { headers: { Authorization: `bearer ${token}` } }
  );
  return response.data;
};
