import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import chattoggleReducer from "./features/chattoggle/chattoggleSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    chattoggleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
