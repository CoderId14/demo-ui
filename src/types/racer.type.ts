import { Key } from "react";

export interface RacerItem {
  key: Key;
  id: number | string;
  name: string;
  dateOfBirth: string;
  national: string;
  bio: string;
  racerOfTeamId?: Key;
}
export interface AddItem {
  name: string;
  dateOfBirth: string;
  national: string;
  bio: string;
}

export interface IRacerRanking {
  key: React.Key;
  racerId?: number;
  ranking: number;
  racerName: string;
  raceTeamName: string;
  national: string;
  totalPoints: number;
  totalTimes: string;
}
export interface IRacerResultDetails {
  key: React.Key;
  racerId: number;
  racerName: string;
  grandPrixName: string;
  time: string;
  finishTime: string;
  ranking: number;
  point: number;
}
