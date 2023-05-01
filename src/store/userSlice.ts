import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import { register } from "../services/apiHandler";

interface UserState {
  users: User[];
  error: string | null;
}

const initialState: UserState = {
  users: [],
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (newUser: { username: string; name: string; password: string; email: string }) => {
    const response = await register(newUser);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearRegisterError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
  },
});

export const { clearRegisterError } = userSlice.actions;
export default userSlice.reducer;
