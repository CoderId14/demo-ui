import {
  registerFailed,
  registerStart,
  registerSuccess,
} from "@/redux/authSlice";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import axiosInstance from "@/config/axios";
import { ResponseRegister, UserDto } from "@/types/user.type";
import { AxiosError } from "axios";

interface UserRegister {
  username: string;
  email: string;
  password: string;
}
export const registerUser = async (
  user: UserRegister,
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  dispatch(registerStart);
  try {
    const res = await axiosInstance.post<ResponseRegister>(
      "/auth/register",
      user,
    );
    dispatch(registerSuccess(res.data));
    navigate("/verify");
    toast.success(res.data.message);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(registerFailed(error.response.data.message));
        toast.error(error.response.data.message);
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.request);
    }
  }
};

export const activeUser = async (
  token: string,
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  dispatch(registerStart);
  let request = {
    token: token,
  };
  try {
    const res = await axiosInstance.post("/auth/register/confirm", request);
    toast.success(res.data);
    navigate("/login");
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }
};
