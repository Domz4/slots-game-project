import axios from "axios";
import { User, Auth, LoginCredentials, RegisterUserData } from "../types";
import urlJoin from "url-join";

const baseURL = "http://localhost:3001";

export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post<Auth>(urlJoin(baseURL, "api/login"), credentials);
  return response.data;
};

export const register = async (userData: RegisterUserData) => {
  const response = await axios.post<User>(urlJoin(baseURL, "api/login"), userData);
  return response.data;
};
