import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { AnyAction } from "redux";
import {
  loginFailed,
  loginGoogleSuccess,
  loginStart,
  loginSuccess,
} from "../redux/authSlice";
import axiosInstance from "../config/axios";
import { LOGIN_URL } from "../constants";
import {
  LOGIN_FAILED_400,
  LOGIN_FAILED_401,
  LOGIN_FAILED_SERVER,
} from "../constants/index";
import { toast } from "react-toastify";

interface ResponseLogin {
  status: string;
  message: string;
  responseData: {
    accessToken: string;
    username: string;
  };
}
export const loginUser = async (
  payload: { username: string; password: string },
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  dispatch(loginStart());
  try {
    console.log("login started ");
    const res = await axiosInstance.post<ResponseLogin>(LOGIN_URL, payload);

    // Data luu vao store
    dispatch(loginSuccess(res.data));

    navigate("/");
    toast.success(res.data.message);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        console.log("before loginFailed");
        dispatch(loginFailed(LOGIN_FAILED_400));
        toast.error(LOGIN_FAILED_400);
      } else if (error.response.status === 401) {
        console.log("before loginFailed");

        dispatch(loginFailed(LOGIN_FAILED_401));
        toast.error(LOGIN_FAILED_401);
        // Account is not active
      } else if (error.response.status === 406) {
        dispatch(loginFailed(error.response.data.message));
        toast.error(error.response.data.message);
      } else if (error.code === "ERR_NETWORK") {
        dispatch(loginFailed("Network Error"));
      }
    }
  }
};

export const loginUserWithGoogle = async (
  accessToken: string | null,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
) => {
  dispatch(loginStart());
  try {
    let res = await axiosInstance.get("/user/current-user", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    console.log("login with google");

    console.log("res: ", res);
    dispatch(
      loginGoogleSuccess({
        ...res.data,
        accessToken: accessToken,
      }),
    );
    navigate("/");
    return res;
  } catch (error) {
    dispatch(loginFailed);
  }
};
