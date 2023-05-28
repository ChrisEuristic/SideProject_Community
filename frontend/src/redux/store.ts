import { configureStore } from "@reduxjs/toolkit";
import chattoggleReducer from "./features/chattoggle/chattoggleSlice";
import counterReducer from "./features/counter/counterSlice";
import friendsToggleReducer from "./features/friends/friendsToggleSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    chattoggleReducer,
    friendsToggleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
