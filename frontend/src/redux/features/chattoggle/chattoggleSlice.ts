import { createSlice } from "@reduxjs/toolkit";

type ChattoggleState = {
  value: number;
};

const initialState = {
  value: 0,
} as ChattoggleState;

export const chattoggle = createSlice({
  name: "chattoggle",
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

export const { setOpen, setOpenFix, reset } = chattoggle.actions;
export default chattoggle.reducer;
