import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { RacerItem } from "@/types/racer.type";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { AnyAction } from "redux";

export const getAllRacers = () => {
  axiosInstance
    .get("/racer", {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      // catch error
      if (err.response) {
        if (err.response.status === 400) {
          toast.error(AppConst.DEFAULT_MESSAGE_400);
        } else if (err.response.status === 404) {
          toast.error(AppConst.DEFAULT_MESSAGE_404);
        } else if (err.response.status === 401) {
          toast.error(AppConst.DEFAULT_MESSAGE_401);
        }
      }
    });
};
export function deleteRacer(
  config: any,
  id: string | number,
  callback: Function,
  errorcallback: Function,
) {
  axiosInstance
    .delete("/racer/" + id, config)
    .then((res) => {
      //do something
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
export function updateRacer(
  config: any,
  id: React.Key,
  callback: Function,
  errorcallback: Function,
) {
  axiosInstance
    .put("/racer/" + id, config)
    .then((res) => {
      //do something
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
