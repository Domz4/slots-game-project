import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gameOutcome } from "../services/apiHandler";

export type Outcome = {
  outcome: number[][];
  winnings: number;
  updatedBalance: number;
  winningLines: number[][];
};

interface SlotsState {
  isAssetsLoading: boolean;
  outcome: Outcome | null;
  reels: number[][];
}

const initialState: SlotsState = {
  isAssetsLoading: false,
  reels: [],
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
    setReels: (state, action: PayloadAction<number[][]>) => {
      state.reels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(spinSlot.fulfilled, (state, action: PayloadAction<Outcome>) => {
      state.outcome = action.payload;
    });
  },
});

export const { setIsAssetsLoading, setReels } = slotsSlice.actions;

export default slotsSlice.reducer;
