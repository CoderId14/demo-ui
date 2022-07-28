import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserLogin {
  username: string;
  password: string;
  accessToken?: string;
}

interface UserRegister {
  username: string;
  password: string;
  email: string;
}

interface UsersLoginSliceState {
  users: UserLogin[];
  isFetching: boolean;
  error: boolean;
}

interface UsersRegisterSliceState {
  users: UserRegister[];
  isFetching: boolean;
  error: boolean;
}

const loginInitialState: UsersLoginSliceState = {
  users: [],
  isFetching: false,
  error: false,
};

const registerInitialState: UsersSliceState = {};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: loginInitialState,
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UsersSliceState>) => {
      state.login.isFetching = false;
      state.login.users = action.payload.users;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
