import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllResult,
  addRacerToResult,
  deleteResult,
} from "../../apiRequests/f1/resultRequest";

export function useFetchResult(
  seasonId: any,
  grandPrixId: any,
  tournamentId: any,
) {
  const queryClient = useQueryClient();

  return useQuery(
    ["result", seasonId, grandPrixId, tournamentId],
    () => getAllResult(tournamentId, seasonId, grandPrixId),
    {
      onSuccess: (data) => {},
    },
  );
}

export function useAddRacerToResult() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ seasonId, grandPrixId, racerOfTeamId }: any) =>
      addRacerToResult(seasonId, grandPrixId, racerOfTeamId),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["racer-register-not-in"]);
        await queryClient.cancelQueries(["racer-register-in"]);
        console.log("data get raceteam by season: " + JSON.stringify(data));
        // queryClient.setQueryData(["raceTeam"], (old: any) => [...data]);
        // return { prevData };
      },
      onError: (err, data, context) => {
        // queryClient.setQueryData(["raceTeam"], context?.prevData);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log("data sdfsfsdf: " + JSON.stringify(data));
        queryClient.invalidateQueries(["racer-register-not-in"]);
        queryClient.invalidateQueries(["racer-register-in"]);
      },
    },
  );
}

export function useDeleteResult() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ seasonId, grandPrixId, racerOfTeamId }: any) =>
      deleteResult(seasonId, grandPrixId, racerOfTeamId),

    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["racer-register-not-in"]);
        await queryClient.cancelQueries(["racer-register-in"]);
        console.log("data get raceteam by season: " + JSON.stringify(data));
        // queryClient.setQueryData(["raceTeam"], (old: any) => [...data]);
        // return { prevData };
      },
      onError: (err, data, context) => {
        // queryClient.setQueryData(["raceTeam"], context?.prevData);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log("data sdfsfsdf: " + JSON.stringify(data));
        queryClient.invalidateQueries(["racer-register-not-in"]);
        queryClient.invalidateQueries(["racer-register-in"]);
      },
    },
  );
}
