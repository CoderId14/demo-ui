import { Key } from "react";

export interface IRaceTeam {
  key: Key;
  id: Key;
  name: string;
  powerUnit: number;
  description: string;
  season?: string;
}
