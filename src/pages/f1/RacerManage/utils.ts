import { RacerItem } from "@/types/racer.type";

export const normalizeDate = (data: RacerItem[]) => {
  data.map((x: RacerItem) => {
    let date = new Date(x.dateOfBirth);

    x.dateOfBirth = date.toISOString().split("T")[0];
    console.log("date: " + x.dateOfBirth);
  });
  return data;
};
