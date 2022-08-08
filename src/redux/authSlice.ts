import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { access } from "fs";

interface UserLogin {
  username: string;
  password: string;
  accessToken?: string;
}

interface User {
  username: string;
  accessToken?: string;
}

interface UserGoogleLoginSliceState {
  accessToken: string | undefined;
  isFetching: boolean;
  error: boolean;
  message: string;
}
const loginGoogleInitialState: UserGoogleLoginSliceState = {
  accessToken: undefined,
  isFetching: false,
  error: false,
  message: "",
};

interface UserRegister {
  username: string;
  password: string;
  email: string;
}

interface UserLogout {
  isFetching: boolean;
  error: boolean;
  message: string;
}
interface UserLoginSliceState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
  message: string;
}

interface UserRegisterSliceState {
  user: UserRegister;
  isFetching: boolean;
  error: boolean;
  success: boolean;
}
interface UserLogoutSliceState {
  isFetching: boolean;
  error: boolean;
  success: boolean;
}

const loginInitialState: UserLoginSliceState = {
  user: undefined,
  isFetching: false,
  error: false,
  message: "",
};

const registerInitialState: UserRegisterSliceState = {
  user: { username: "", password: "", email: "" },
  isFetching: false,
  error: false,
  success: false,
};
const logoutInitialState: UserLogoutSliceState = {
  isFetching: false,
  error: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: loginInitialState,
    register: registerInitialState,
    logout: logoutInitialState,
    loginGoogle: loginGoogleInitialState,
  },
  reducers: {
    loginStart: (state: any) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state: any, action: PayloadAction<UserLoginSliceState>) => {
      console.log("action: " + JSON.stringify(action.payload));
      state.login.isFetching = false;
      state.login.user = action.payload.user;
      state.login.error = false;
      state.login.message = action.payload.message;
    },
    loginFailed: (state: any, action: PayloadAction<string>) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.message = action.payload;
    },
    loginGoogle: (state: any, action: PayloadAction<string>) => {
      state.loginGoogle.accessToken = action.payload;
    },

    registerStart: (state: any) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state: any) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state: any) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },

    logoutStart: (state: any) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state: any, action: PayloadAction<string>) => {
      state.logout.isFetching = false;
      state.logout.error = false;
      state.login.user = null;
      state.logout.message = action.payload;
    },
    logoutFailed: (state: any, action: PayloadAction<string>) => {
      state.logout.isFetching = false;
      state.logout.error = true;
      state.logout.message = action.payload;
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
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
