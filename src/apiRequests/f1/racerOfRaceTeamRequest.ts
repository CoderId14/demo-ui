import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { Key } from "react";
import { toast } from "react-toastify";

export const getRacerNotInGrandPrix = async (
  seasonId: Key,
  grandPrixId: Key,
  raceTeamId: Key,
) => {
  try {
    seasonId = seasonId || "1";
    grandPrixId = grandPrixId || "1";
    raceTeamId = raceTeamId || "1";
    const res = await axiosInstance.get("/racerOfTeam/test1", {
      params: {
        seasonId: Number(seasonId),
        grandPrixId: Number(grandPrixId),
        raceTeamId: Number(raceTeamId),
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
export const getRacerInGrandPrix = async (
  seasonId: Key,
  grandPrixId: Key,
  raceTeamId: Key,
) => {
  try {
    seasonId = seasonId || "1";
    grandPrixId = grandPrixId || "1";
    raceTeamId = raceTeamId || "1";
    const res = await axiosInstance.get("/racerOfTeam/test2", {
      params: {
        seasonId: Number(seasonId),
        grandPrixId: Number(grandPrixId),
        raceTeamId: Number(raceTeamId),
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
