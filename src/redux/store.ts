import { configureStore } from "@reduxjs/toolkit";
import { StringLiteral } from "typescript";

import authReducer from "./authSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
