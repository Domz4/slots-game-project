import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../types";
import { login } from "../services/authAPI";

interface AuthState {
  auth: Auth | null;
  error: string | null;
}

const initialState: AuthState = {
  auth: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const response = await login(credentials);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
  },
});

export const { clearLoginError } = authSlice.actions;
export default authSlice.reducer;
