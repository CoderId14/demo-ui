import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { toast } from "react-toastify";

export const getAllSeasons = async () => {
  try {
    const res = await axiosInstance.get("/season", {
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
