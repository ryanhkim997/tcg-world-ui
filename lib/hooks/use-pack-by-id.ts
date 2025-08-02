import { useQuery } from "@tanstack/react-query"
import { findPackById } from "@/lib/api/packs"

/**
 * Hook to fetch a pack by ID
 * @param id The ID of the pack to fetch
 */
export function usePackById(id: string) {
  return useQuery({
    queryKey: ["packs", id],
    queryFn: () => findPackById(id),
    enabled: !!id,
  })
}
