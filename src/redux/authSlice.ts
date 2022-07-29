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

interface UserLogout {
  isFetching: boolean;
  error: boolean;
  message: string;
}
interface UserLoginSliceState {
  user: UserLogin;
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
  user: { username: "", password: "", accessToken: "" },
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
  },
  reducers: {
    loginStart: (state: any) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state: any, action: PayloadAction<UserLoginSliceState>) => {
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

    registerStart: (state: any) => {
      state.register.isFetching = true;
    },
    registerSuccess: (
      state: any,
      action: PayloadAction<UserRegisterSliceState>,
    ) => {
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
      state.login.user = { username: "", password: "", accessToken: "" };
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
