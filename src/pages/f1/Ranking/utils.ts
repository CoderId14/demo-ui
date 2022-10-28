import { IRacerRanking, RacerItem } from "@/types/racer.type";

export const normalizeDate = (data: IRacerRanking[]) => {
  data.map((x: IRacerRanking) => {
    let date = new Date(x.totalTimes);

    x.totalTimes = date.toISOString().split("T")[0];
    console.log("date: " + x.totalTimes);
  });
  return data;
};
