import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeState {
  [nodeId: number]: boolean;
}

const initialState: TreeState = {};

const treeStateSlice = createSlice({
  name: "treeState",
  initialState,
  reducers: {
    toggleNodeExpansion: (state, action: PayloadAction<number>) => {
      const nodeId = action.payload;
      state[nodeId] = !state[nodeId];
    },
  },
});

export const { toggleNodeExpansion } = treeStateSlice.actions;
export default treeStateSlice.reducer;
