import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { toast } from "react-toastify";

export const getAllGrandPrixes = async () => {
  try {
    const res = await axiosInstance.get("/grand-prix", {
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
export async function deleteGrandPrix(id: string | number) {
  try {
    const res = await axiosInstance.delete("/grand-prix/" + id);
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
export async function updateGrandPrix(id: React.Key, data: any) {
  try {
    console.log("data update racer: " + JSON.stringify(data));
    const res = await axiosInstance.put("/grand-prix/" + id, data);
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
export async function addGrandPrix(data: any) {
  try {
    const res = await axiosInstance.post("/grand-prix/", data);
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
export const getGrandPrixesBySeason = async (seasonId: number) => {
  try {
    const res = await axiosInstance.get("/grand-prix/season", {
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
