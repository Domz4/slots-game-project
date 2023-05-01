import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReelData } from "../components/game/types/types";

interface SlotsState {
  isAssetsLoading: boolean;
  reels: ReelData[];
}

const initialState: SlotsState = {
  isAssetsLoading: false,
  reels: [],
};

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setIsAssetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAssetsLoading = action.payload;
    },
    setReels: (state, action: PayloadAction<ReelData[]>) => {
      state.reels = action.payload;
    },
  },
});

export const { setIsAssetsLoading, setReels } = slotsSlice.actions;

export default slotsSlice.reducer;
