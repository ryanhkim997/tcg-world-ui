import { useQuery } from "@tanstack/react-query";
import { findPacks } from "@/lib/api/packs";
import { Pagination } from "@/types/pagination";

/**
 * Hook to fetch packs for the home page
 * @param pagination Pagination parameters
 */
export function usePacks(pagination: Pagination = { page: 1, limit: 10 }) {
  return useQuery({
    queryKey: ["packs", pagination],
    queryFn: () => findPacks(pagination),
  });
}
