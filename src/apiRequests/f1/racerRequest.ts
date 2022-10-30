import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { RacerItem } from "@/types/racer.type";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { AnyAction } from "redux";
import AxiosResponse from "axios";

export const getAllRacers = async () => {
  try {
    const res = await axiosInstance.get("/racer", {
      headers: {
        "content-type": "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
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
  }
};
export async function deleteRacer(id: string | number) {
  try {
    const res = await axiosInstance.delete("/racer/" + id);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 400) {
        toast.error(AppConst.DEFAULT_MESSAGE_400);
      } else if (err.response.status === 404) {
        toast.error(AppConst.DEFAULT_MESSAGE_404);
      } else if (err.response.status === 401) {
        toast.error(AppConst.DEFAULT_MESSAGE_401);
      }
    }
  }
}
export async function updateRacer(id: React.Key, data: any) {
  try {
    console.log("data update racer: " + JSON.stringify(data));
    const res = await axiosInstance.put("/racer/" + id, data);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 400) {
        toast.error(AppConst.DEFAULT_MESSAGE_400);
      } else if (err.response.status === 404) {
        toast.error(AppConst.DEFAULT_MESSAGE_404);
      } else if (err.response.status === 401) {
        toast.error(AppConst.DEFAULT_MESSAGE_401);
      }
    }
  }
}
export async function addRacer(data: any) {
  try {
    const res = await axiosInstance.post("/racer/", data);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 400) {
        toast.error(AppConst.DEFAULT_MESSAGE_400);
      } else if (err.response.status === 404) {
        toast.error(AppConst.DEFAULT_MESSAGE_404);
      } else if (err.response.status === 401) {
        toast.error(AppConst.DEFAULT_MESSAGE_401);
      }
    }
  }
}
