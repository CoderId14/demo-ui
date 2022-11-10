import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { Key } from "react";
import { toast } from "react-toastify";

export const getAllResult = async (
  tournamentId: any,
  seasonId: any,
  grandPrixId: any,
) => {
  try {
    const res = await axiosInstance.get("/result", {
      params: {
        tournamentId,
        seasonId,
        grandPrixId,
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
export const getResultBySeason = async (seasonId: number) => {
  try {
    const res = await axiosInstance.get("/result", {
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
export const addRacerToResult = async (
  seasonId: Key,
  grandPrixId: Key,
  racerOfTeamId: Key,
) => {
  try {
    const res = await axiosInstance.post(
      "/result/racer",
      {
        seasonId: Number(seasonId),
        grandPrixId: Number(grandPrixId),
        racerOfTeamId: Number(racerOfTeamId),
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
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
export const deleteResult = async (
  seasonId: Key,
  grandPrixId: Key,
  racerOfTeamId: Key,
) => {
  try {
    const res = await axiosInstance.post(
      "/result/racer/delete",
      {
        seasonId: Number(seasonId),
        grandPrixId: Number(grandPrixId),
        racerOfTeamId: Number(racerOfTeamId),
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
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
