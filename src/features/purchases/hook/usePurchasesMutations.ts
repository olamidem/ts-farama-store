import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "../../../lib/queryKey";
import {
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchaseGoods,
} from "../services/purchase.service";

import type {
  CreatePurchaseInput,
  UpdatePurchaseInput,
} from "../types/purchase";

export function useCreatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePurchaseInput) => createPurchase(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.purchases,
      });
      toast.success("Purchase created successfully.");
    },
  });
}

export function useUpdatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePurchaseInput }) =>
      updatePurchase(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.purchases,
      });
      toast.success("Purchase updated successfully.");
    },
  });
}

export function useDeletePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePurchase(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.purchases,
      });
      toast.success("Purchase deleted successfully.");
    },
  });
}

export function useReceivePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: receivePurchaseGoods,

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.purchases,
        }),

        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEYS.purchases, variables.purchaseId],
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.products,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.inventoryTransactions,
        }),
      ]);

      toast.success("Goods received successfully.");
    },
  });
}
