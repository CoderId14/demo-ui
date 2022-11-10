import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSeasons } from "../../apiRequests/f1/seasonRequest";
export function useFetchSeasons() {
  const queryClient = useQueryClient();

  return useQuery(["season"], getAllSeasons, {});
}
