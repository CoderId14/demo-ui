import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllRacers,
  updateRacer,
  deleteRacer,
  addRacer,
} from "../../apiRequests/f1/racerRequest";
import { normalizeDate } from "@/pages/f1/RacerManage/utils";

export function useFetchRacers() {
  const queryClient = useQueryClient();

  return useQuery(["racers"], getAllRacers, {
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData(["racers"]);
      queryClient.setQueryData(["racers"], (old: any) => normalizeDate(old));
    },
  });
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
