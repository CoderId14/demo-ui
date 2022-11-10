import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { RacerItem } from "@/types/racer.type";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { AnyAction } from "redux";
import AxiosResponse from "axios";

export const getAllRaceteam = async () => {
  try {
    const res = await axiosInstance.get("/race-team", {
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

export const getRaceTeamsBySeason = async (seasonId: number) => {
  try {
    const res = await axiosInstance.get("/race-team/season", {
      params: {
        seasonId: seasonId,
      },
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
export async function deleteRaceTeam(id: string | number) {
  try {
    const res = await axiosInstance.delete("/race-team/" + id);
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
export async function updateRaceTeam(id: React.Key, data: any) {
  try {
    console.log("data update raceteam: " + JSON.stringify(data));
    const res = await axiosInstance.put("/race-team/" + id, data);
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
export async function addRaceTeam(data: any) {
  try {
    const res = await axiosInstance.post("/racer-team", data);
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
