import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllRacers,
  updateRacer,
  deleteRacer,
  addRacer,
} from "../../apiRequests/f1/racerRequest";
import { normalizeDate } from "@/pages/f1/RacerManage/utils";
import { get } from "http";
import {
  getRacerRanking,
  getRacerResultDetail,
} from "../../apiRequests/f1/racerRequest";
import { Key } from "react";
import {
  getRacer,
  getRacerRankingBySeason,
} from "../../apiRequests/f1/racerRequest";

export function useFetchRacers() {
  const queryClient = useQueryClient();

  return useQuery(["racers"], getAllRacers, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["racers"]);
      queryClient.setQueryData(["racers"], (old: any) => normalizeDate(old));
    },
  });
}
export function useFetchRacer(id: Key) {
  const queryClient = useQueryClient();

  return useQuery(["racer", { id: id }], () => getRacer(id), {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["racer"]);
    },
  });
}
export function useFetchRacerRanking() {
  const queryClient = useQueryClient();

  return useQuery(["racer-ranking"], getRacerRanking, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["racer-ranking"]);
    },
  });
}
export function useFetchRacerRankingBySeason() {
  const queryClient = useQueryClient();
  return useMutation(({ seasonId }: any) => getRacerRankingBySeason(seasonId), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["racer-ranking"]);
      const prevData = queryClient.getQueryData(["racer-ranking"]);
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
      queryClient.setQueryData(["racer-ranking"], (old: any) => [...data]);
    },
  });
}

export function useFetchRacerResultDetail(racerId: Key, seasonId: Key) {
  const queryClient = useQueryClient();

  return useQuery(
    ["racer-detail", { racerId, seasonId }],
    getRacerResultDetail,
    {},
  );
}

export function useUpdateRacers() {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: any) => updateRacer(id, data), {
    onMutate: async () => {
      await queryClient.cancelQueries(["racers"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["racers"]);
    },
  });
}
export function useDeleteRacer() {
  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => deleteRacer(id), {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["racers"]);
      console.log("data, id" + id);
      const prevData = queryClient.getQueryData(["racers"]);
      console.log("prevData: " + prevData);
      queryClient.setQueryData(["racers"], (old: any) =>
        old.filter((oldId: any) => oldId.id !== id),
      );
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["racers"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["racers"]);
    },
  });
}
export function useAddRacer() {
  const queryClient = useQueryClient();
  return useMutation(({ data }: any) => addRacer(data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["racers"]);
      const prevData = queryClient.getQueryData(["racers"]);
      queryClient.setQueryData(["racers"], (old: any) => [...old, data]);
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["racers"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["racers"]);
    },
  });
}
