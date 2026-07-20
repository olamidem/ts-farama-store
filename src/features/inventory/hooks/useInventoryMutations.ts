import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "../../../lib/queryKey";
import { createInventoryTransaction } from "../services/inventory.service";

export function useCreateInventoryTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventoryTransaction,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.inventory,
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.products,
        }),
      ]);

      toast.success("Inventory transaction recorded successfully.");
    },
  });
}