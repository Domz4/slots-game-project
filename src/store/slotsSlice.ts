import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gameOutcome } from "../services/apiHandler";

type Outcome = {
  outcome: string[][];
  winnings: number;
  updatedBalance: number;
};

interface SlotsState {
  isAssetsLoading: boolean;
  outcome: Outcome | null;
}

const initialState: SlotsState = {
  isAssetsLoading: false,
  outcome: null,
};

export const spinSlot = createAsyncThunk("slots/play", async (betAmount: number) => {
  const data = await gameOutcome(betAmount);
  return data;
});

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setIsAssetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAssetsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(spinSlot.fulfilled, (state, action: PayloadAction<Outcome>) => {
      state.outcome = action.payload;
    });
  },
});

export const { setIsAssetsLoading } = slotsSlice.actions;

export default slotsSlice.reducer;
