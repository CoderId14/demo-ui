export interface RacerItem {
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
  ranking: number;
  name: string;
  raceTeam: string;
  national: string;
  totalPoints: number;
  totalTimes: string;
}
