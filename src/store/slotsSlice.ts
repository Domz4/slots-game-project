import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Texture } from "pixi.js";
import { ReelData } from "../components/game/types/types";
import { RootState } from "./store";

interface SlotsState {
  isAssetsLoading: boolean;
  textures: Texture[];
  reels: ReelData[];
}

const initialState: SlotsState = {
  isAssetsLoading: false,
  textures: [],
  reels: [],
};

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setIsAssetsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAssetsLoading = action.payload;
    },
    setTextures: (state, action: PayloadAction<Texture[]>) => {
      state.textures = action.payload;
    },
    setReels: (state, action: PayloadAction<ReelData[]>) => {
      state.reels = action.payload;
    },
  },
});

export const { setIsAssetsLoading, setTextures, setReels } = slotsSlice.actions;

export default slotsSlice.reducer;
