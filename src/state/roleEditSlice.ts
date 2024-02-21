import { createSlice } from "@reduxjs/toolkit";

interface RoleEditState {
  edit: boolean;
}

const initialState: RoleEditState = { edit: false };

const roleEditSlice = createSlice({
  name: "roleEditState",
  initialState,
  reducers: {
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    hideEdit: (state) => {
      state.edit = false;
    },
  },
});

export const { toggleEdit, hideEdit } = roleEditSlice.actions;
export default roleEditSlice.reducer;
