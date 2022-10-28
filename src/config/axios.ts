import { EnhancedStore } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState, selectAuth } from "../redux/store";

let store: EnhancedStore;
export const injectStore = (_store: any) => {
  store = _store;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  // timeout: 2000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    // Do something before request is sent
    const accessToken = store.getState().auth.login.user?.accessToken || "";
    console.log("accessToken: " + accessToken);
    if (accessToken) config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error: ", error);
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
