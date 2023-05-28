import { createSlice } from "@reduxjs/toolkit";

type FriendsToggleState = {
  value: number;
};

const initialState = {
  value: 0,
} as FriendsToggleState;

export const friendsToggle = createSlice({
  name: "friendstoggle",
  initialState,
  reducers: {
    reset: () => initialState,
    setOpen: (state) => {
      state.value = 1;
    },
    setOpenFix: (state) => {
      state.value = 2;
    },
  },
});

export const { setOpen, setOpenFix, reset } = friendsToggle.actions;
export default friendsToggle.reducer;
