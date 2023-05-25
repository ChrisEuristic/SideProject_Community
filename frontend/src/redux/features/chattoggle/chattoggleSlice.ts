import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChattoggleState = {
  value: boolean;
};

const initialState = {
  value: false,
} as ChattoggleState;

export const chattoggle = createSlice({
  name: "chattoggle",
  initialState,
  reducers: {
    reset: () => initialState,
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const {
  toggle,
  reset,
} = chattoggle.actions;
export default chattoggle.reducer;
