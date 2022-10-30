import { Key } from "react";
import { IRaceCourse } from "./raceCourse.type";
export interface IGrandPrix {
  key: Key;
  name: string;
  laps: number;
  time: string;
  description: string;
  raceCourse: string;
}
