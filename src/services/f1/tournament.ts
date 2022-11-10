import { getAllGrandPrixes } from "@/apiRequests/f1/grandPrixRequest";
import { getAllTournament } from "@/apiRequests/f1/tournament";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchTournament() {
  const queryClient = useQueryClient();

  return useQuery(["tournament"], getAllTournament, {
    onSuccess: (data) => {},
  });
}
