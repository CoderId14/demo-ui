import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllRacers,
  updateRacer,
  deleteRacer,
  addRacer,
} from "../../apiRequests/f1/racerRequest";
import { normalizeDate } from "@/pages/f1/RacerManage/utils";
import {
  addGrandPrix,
  deleteGrandPrix,
  getAllGrandPrixes,
  getGrandPrixesBySeason,
  updateGrandPrix,
} from "../../apiRequests/f1/grandPrixRequest";

export function useFetchGrandPrixes() {
  const queryClient = useQueryClient();

  return useQuery(["grandPrix"], getAllGrandPrixes, {
    onSuccess: (data) => {},
  });
}

export function useUpdateGrandPrix() {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: any) => updateGrandPrix(id, data), {
    onMutate: async () => {
      await queryClient.cancelQueries(["grandPrix"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["grandPrix"]);
    },
  });
}
export function useDeleteGrandPrix() {
  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => deleteGrandPrix(id), {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["grandPrix"]);
      console.log("data, id" + id);
      const prevData = queryClient.getQueryData(["grandPrix"]);
      console.log("prevData: " + prevData);
      queryClient.setQueryData(["grandPrix"], (old: any) =>
        old.filter((oldId: any) => oldId.id !== id),
      );
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["grandPrix"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["grandPrix"]);
    },
  });
}
export function useAddGrandPrix() {
  const queryClient = useQueryClient();
  return useMutation(({ data }: any) => addGrandPrix(data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["grandPrix"]);
      const prevData = queryClient.getQueryData(["grandPrix"]);
      queryClient.setQueryData(["grandPrix"], (old: any) => [...old, data]);
      return { prevData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["grandPrix"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["grandPrix"]);
    },
  });
}
export function useFetchGrandPrixesBySeason() {
  const queryClient = useQueryClient();
  return useMutation(({ seasonId }: any) => getGrandPrixesBySeason(seasonId), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["grandPrix"]);
      const prevData = queryClient.getQueryData(["grandPrix"]);
      // console.log("data get grandPrix by season: " + JSON.stringify(data));
      // queryClient.setQueryData(["grandPrix"], (old: any) => [data]);
      // return { prevData };
    },
    onError: (err, data, context) => {
      // queryClient.setQueryData(["grandPrix"], context?.prevData);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log("data sdfsfsdf: " + JSON.stringify(data));
      queryClient.setQueryData(["grandPrix"], (old: any) => [...data]);
    },
  });
}
