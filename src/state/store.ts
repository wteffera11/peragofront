// store.ts

import { configureStore } from "@reduxjs/toolkit";
import treeStateReducer from "./treeSlice";
import roleEditSlice from "./roleEditSlice";

const store = configureStore({
  reducer: {
    treeState: treeStateReducer,
    roleEditState: roleEditSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
