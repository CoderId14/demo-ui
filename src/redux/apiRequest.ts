import axios, { AxiosResponse } from "axios";
import { access } from "fs";
import { NavigateFunction } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";
import { getPostsFailed, getPostsStart } from "./postSlice";

const baseURL = "http://localhost:8080";
const LOGIN_URL = "/api/auth/login";
const REGISTER_URL = "/api/auth/register";
const POST_URL = "/api/post";
const LOGOUT_URL = "/api/auth/logout";

type UserRegister = {
  username: string;
  password: string;
  email: string;
};
type UserLogin = {
  username: string;
  password: string;
  accessToken?: string;
};

type User = {
  username: string;
  accessToken?: string;
};
interface UserSliceState {
  user: User | undefined;
  isFetching: boolean;
  error: boolean;
  message: string;
}

interface UserLoginSliceState {
  user: UserLogin | undefined;
  isFetching: boolean;
  error: boolean;
  message: string;
}
export const loginUserWithGoogle = async (
  accessToken: any,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  dispatch(loginStart());
  try {
    let res = await axios.get(baseURL + "/api/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("login with google");
    let user: UserLogin = {
      username: res.data.responseData,
      password: "",
      accessToken: accessToken,
    };
    console.log(
      "res.data.responseData = " + JSON.stringify(res.data.responseData),
    );
    let userSlice: UserLoginSliceState = {
      user: user,
      isFetching: false,
      error: false,
      message: "Login success",
    };
    console.log("userSlice: ", userSlice);
    dispatch(loginSuccess(userSlice));
    navigate("/");
    return res;
  } catch (error) {
    dispatch(loginFailed);
  }
};

export const loginUser = async (
  user: UserLogin,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  dispatch(loginStart());
  try {
    const res: AxiosResponse<any, any> = await axios.post(
      baseURL + LOGIN_URL,
      user,
    );
    console.log("res loginUser: " + JSON.stringify(res.data.responseData));
    // Data luu vao store
    let usertemp: User = {
      username: res.data.responseData.username,
      accessToken: res.data.responseData.accessToken,
    };
    let temp: UserSliceState = {
      user: usertemp,
      isFetching: false,
      error: false,
      message: "Login success",
    };
    dispatch(loginSuccess(temp));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed);
  }
};

export const registerUser = async (
  user: UserRegister,
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  dispatch(registerStart);
  try {
    await axios.post(baseURL + REGISTER_URL, user);
    dispatch(registerSuccess);
    navigate("/verify");
  } catch (error) {
    dispatch(registerFailed);
  }
};

export const logOut = async (
  dispatch: Dispatch,
  username: string,
  navigate: NavigateFunction,
  accessToken: string,
) => {
  dispatch(logoutStart());
  try {
    // const res = await axios.post(baseURL + LOGOUT_URL, username, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    dispatch(logoutSuccess("Logout succcess"));
  } catch (error) {
    dispatch(logoutFailed("log out failed"));
  }
};

export const getAllPosts = async (accessToken: string, dispatch: Dispatch) => {
  dispatch(getPostsStart());

  try {
    const res = await axios.get(baseURL + POST_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    dispatch(getPostsFailed());
  }
};
