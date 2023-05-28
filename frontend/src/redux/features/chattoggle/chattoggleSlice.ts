import { createSlice } from "@reduxjs/toolkit";

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
    setTrue: (state) => {
      state.value = true;
    },
  },
});

export const {
  setTrue,
  reset,
} = chattoggle.actions;
export default chattoggle.reducer;
