import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../types";
import { login, addBalance as addBalanceAPI, setToken } from "../services/apiHandler";
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
    window.localStorage.setItem("loggedUser", JSON.stringify(response));
    setToken(response.token);
    return response;
  }
);

export const addBalance = createAsyncThunk("auth/addBalance", async (amount: number) => {
  const response = await addBalanceAPI(amount);
  window.localStorage.setItem("loggedUser", JSON.stringify(response));
  return response.balance;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.auth = null;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
    setBalance: (state, action: PayloadAction<Partial<Auth>>) => {
      if (state.auth) {
        state.auth = {
          ...state.auth,
          ...action.payload,
        };
      } else {
        state.auth = action.payload as Auth;
      }
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
    builder.addCase(addBalance.fulfilled, (state, action: PayloadAction<number>) => {
      if (state.auth) {
        state.auth.balance = action.payload;
      }
    });
    builder.addCase(addBalance.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
  },
});

export const { clearLoginError, logout, setUser, setBalance } = authSlice.actions;
export default authSlice.reducer;
