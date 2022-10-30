import { Key } from "react";

export interface RacerItem {
  key: Key;
  id: number | string;
  name: string;
  dateOfBirth: string;
  national: string;
  bio: string;
}
export interface AddItem {
  name: string;
  dateOfBirth: string;
  national: string;
  bio: string;
}

export interface IRacerRanking {
  key: React.Key;
  id?: number;
  ranking: number;
  name: string;
  raceTeam: string;
  national: string;
  totalPoints: number;
  totalTimes: string;
}
