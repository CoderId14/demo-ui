import axios, { AxiosError, AxiosResponse } from "axios";
import { access } from "fs";
import { NavigateFunction } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { toast, ToastContainer } from "react-toastify";
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
import { afterChangePassword, sendMailRecovery, setEmail } from "./userSlice";
import { Toast } from "react-toastify/dist/types";

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

interface sendMailRecoveryPayload {
  email: string;
  token: string;
}

const showSuccessToast = (message: any) => {
  toast.success(message, {
    data: {
      title: "Success toast",
      text: "This is a success message",
    },
  });
};

export const getUserByToken = async (
  token: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  try {
    let res = await axios.get(baseURL + "/api/user/forgot-password", {
      params: {
        token: token,
      },
    });
    console.log("res.data getUserByToken = " + JSON.stringify(res.data));
    let payload: sendMailRecoveryPayload = {
      email: res.data.username,
      token: res.data.token,
    };
    dispatch(sendMailRecovery(payload));
  } catch (error) {}
};

interface IChangePassword {
  usernameOrEmail: string;
  password: string;
  token: string;
}

export const changPassword = async (
  data: IChangePassword,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  try {
    let res = await axios.post(baseURL + "/api/user/change-password", data);
    console.log("res.data = " + JSON.stringify(res.data));
    dispatch(afterChangePassword());
    alert("change password success");
    navigate("/login");
  } catch (error: any) {
    console.log(error.response.data.error + " adasd");
  }
};

export const sendMailForgotPassword = async (
  usernameOrEmail: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  let res = await axios.post(baseURL + "/api/user/forgot-password", {
    usernameOrEmail,
  });
  console.log("res.data = " + JSON.stringify(res.data));
  let payload: sendMailRecoveryPayload = {
    email: res.data.email,
    token: res.data.token,
  };
  dispatch(sendMailRecovery(payload));
};
export const forgotPasswords = async (
  usernameOrEmail: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  try {
    let email = await axios.get(baseURL + "/api/user", {
      params: {
        usernameOrEmail: usernameOrEmail,
      },
    });
    dispatch(setEmail(email.data.responseData));
    navigate("/verify");
    sendMailForgotPassword(email.data.responseData, dispatch, navigate);
  } catch (error: any) {
    console.log(error.response.data.error + " adasd");
  }
};

export const loginUserWithGoogle = async (
  accessToken: any,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  dispatch(loginStart());
  try {
    let res = await axios.get(baseURL + "/api/user/current-user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("login with google");
    let user: UserLogin = {
      username: res.data.responseData,
      password: "",
      accessToken: accessToken,
    };

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
export const activeUser = async (
  token: string,
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  dispatch(registerStart);
  try {
    await axios.post(baseURL + "/api/auth/register/confirm", token);
    navigate("/login");
  } catch (error) {}
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
