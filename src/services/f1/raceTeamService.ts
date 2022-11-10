import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {} from "../../apiRequests/f1/racerRequest";
import { normalizeDate } from "@/pages/f1/RacerManage/utils";
import {
  addRaceTeam,
  deleteRaceTeam,
  getAllRaceteam,
  getRaceTeamsBySeason,
  updateRaceTeam,
} from "@/apiRequests/f1/raceTeamRequest";

export function useFetchRaceTeams() {
  const queryClient = useQueryClient();

  return useQuery(["raceTeam"], getAllRaceteam, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["raceTeam"]);
    },
  });
}

export function useUpdateRaceTeam() {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: any) => updateRaceTeam(id, data), {
    onMutate: async () => {
      await queryClient.cancelQueries(["raceTeam"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["raceTeam"]);
    },
  });
}
export function useDeleteRaceTeam() {
  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => deleteRaceTeam(id), {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["raceTeam"]);
      console.log("data, id" + id);
      const prevData = queryClient.getQueryData(["raceTeam"]);
      console.log("prevData: " + prevData);
      queryClient.setQueryData(["raceTeam"], (old: any) =>
        old.filter((oldId: any) => oldId.id !== id),
      );
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["raceTeam"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["raceTeam"]);
    },
  });
}
export function useAddRaceTeam() {
  const queryClient = useQueryClient();
  return useMutation(({ data }: any) => addRaceTeam(data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["raceTeam"]);
      const prevData = queryClient.getQueryData(["raceTeam"]);
      queryClient.setQueryData(["raceTeam"], (old: any) => [...old, data]);
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["raceTeam"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["raceTeam"]);
    },
  });
}
export function useFetchRaceTeamsBySeason() {
  const queryClient = useQueryClient();
  return useMutation(({ seasonId }: any) => getRaceTeamsBySeason(seasonId), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["raceTeam"]);
      const prevData = queryClient.getQueryData(["raceTeam"]);
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
      queryClient.setQueryData(["raceTeam"], (old: any) => [...data]);
    },
  });
}
