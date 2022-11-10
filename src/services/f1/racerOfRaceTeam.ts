import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRacerInGrandPrix,
  getRacerNotInGrandPrix,
} from "../../apiRequests/f1/racerOfRaceTeamRequest";

export function useFetchRacerNotInGrandPrix() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ seasonId, grandPrixId, raceTeamId }: any) =>
      getRacerNotInGrandPrix(seasonId, grandPrixId, raceTeamId),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["racer-register-not-in"]);
        const prevData = queryClient.getQueryData(["racer-register-not-in"]);
        // console.log("data get raceteam by season: " + JSON.stringify(data));
        // queryClient.setQueryData(["raceTeam"], (old: any) => [data]);
        // return { prevData };
      },
      onError: (err, data, context) => {
        // queryClient.setQueryData(["raceTeam"], context?.prevData);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log("data sdfsfsdf: " + JSON.stringify(data));
        queryClient.setQueryData(["racer-register-not-in"], (old: any) => [
          ...data,
        ]);
      },
    },
  );
}
export function useFetchRacerInGrandPrix() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ seasonId, grandPrixId, raceTeamId }: any) =>
      getRacerInGrandPrix(seasonId, grandPrixId, raceTeamId),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["racer-register-in"]);
        const prevData = queryClient.getQueryData(["racer-register-in"]);
        // console.log("data get raceteam by season: " + JSON.stringify(data));
        // queryClient.setQueryData(["raceTeam"], (old: any) => [data]);
        // return { prevData };
      },
      onError: (err, data, context) => {
        // queryClient.setQueryData(["raceTeam"], context?.prevData);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log("data sdfsfsdf: " + JSON.stringify(data));
        queryClient.setQueryData(["racer-register-in"], (old: any) => [
          ...data,
        ]);
      },
    },
  );
}
