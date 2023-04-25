import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/users",
});

export const registerUser = async (data: { username: string; email: string; password: string }) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post("/login", data);
  return response.data;
};
