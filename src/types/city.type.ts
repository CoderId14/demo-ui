import { Key } from "react";
import { INation } from "./nation.type";

export interface ICity {
  id?: Key;
  name: string;
  nation: string;
}
