import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import slotsReducer from "./slotsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slots: slotsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
