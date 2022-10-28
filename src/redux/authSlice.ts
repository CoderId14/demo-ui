import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { access } from "fs";
import { ResponseRegister } from "@/types/user.type";

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

interface UserLoginSliceState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
  message: string;
}

interface UserRegisterSliceState {
  user: { email: string; username: string };
  isFetching: boolean;
  error: boolean;
  success: boolean;
  message: string;
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
  user: { email: "", username: "" },
  isFetching: false,
  error: false,
  success: false,
  message: "",
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
    loginSuccess: (state: any, action) => {
      console.log("action: " + JSON.stringify(action.payload));
      state.login.isFetching = false;
      state.login.user = action.payload.responseData;
      state.login.error = false;
      state.login.message = action.payload.message;
    },
    loginGoogleSuccess: (state: any, action) => {
      console.log("action google login: " + JSON.stringify(action.payload));
      state.login.isFetching = false;
      state.login.user = {
        username: action.payload.responseData,
        accessToken: action.payload.accessToken,
      };
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
    registerSuccess: (state: any, action: PayloadAction<ResponseRegister>) => {
      state.register.user = {
        email: action.payload.responseData.email,
        username: action.payload.responseData.username,
      };
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
      state.register.message = action.payload.message;
    },
    registerFailed: (state: any, action: PayloadAction<string>) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      state.register.message = action.payload;
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
  loginGoogleSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
