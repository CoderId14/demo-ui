import { RacerItem } from "@/types/racer.type";

export const normalizeDate = (data: any) => {
  data.map((x: any) => {
    let date = new Date(x.dateOfBirth);
    x.dateOfBirth = date.toISOString().split("T")[0];
    console.log("date: " + x.dateOfBirth);
  });
  return data;
};
