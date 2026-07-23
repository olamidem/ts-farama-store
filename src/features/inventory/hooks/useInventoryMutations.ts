import { createStockAdjustment } from './../services/inventory.service';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import type { StockAdjustmentInput } from "../types/inventory";
import { toast } from "sonner";

export const useCreateStockAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: StockAdjustmentInput) => createStockAdjustment(input),
    onSuccess: () => {
      // Invalidate all inventory-related queries
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.inventory,
      });
      // Invalidate products so that stock levels update on products pages
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });

      toast.success("Stock adjustment completed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete stock adjustment");
    },
  });
};
