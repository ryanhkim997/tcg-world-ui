import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { pull } from "@/lib/api/pull";
import { Card } from "@/types/card";

/**
 * Interface for pull parameters
 */
interface PullParams {
  userId: string;
  packId: string;
  clientSeed: string;
  nonce: number;
}

/**
 * Response type for pull operation
 */
export interface PullResponse {
  pulledCard: Card;
  seeds?: {
    clientSeed: string;
    serverSeed: string;
    nonce: number;
  };
}

/**
 * Hook to pull a card from a pack
 */
export function usePullCard(options?: UseMutationOptions<PullResponse, Error, PullParams>) {
  return useMutation<PullResponse, Error, PullParams>({
    mutationFn: (params: PullParams) => pull(params),
    ...options,
  });
}
