import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  archiveProductUnit,
  createProductUnit,
  restoreProductUnit,
  updateProductUnit,
} from "../services/productUnit.service";
import { QUERY_KEYS } from "../../../../lib/queryKey";
import type { ProductUnitContext, UpdateProductUnitVariables } from "../types/mutations";


const useInvalidateProductUnits = () => {
  const queryClient = useQueryClient();
  return (productId: string) =>
    queryClient.invalidateQueries({
      queryKey: [...QUERY_KEYS.productUnits, productId],
    });
};

export const useCreateProductUnit = () => {
  const invalidate = useInvalidateProductUnits();
  return useMutation({
    mutationFn: createProductUnit,
    onSuccess: async (_, variables) => {
      await invalidate(variables.product_id);
      toast.success("Selling unit created successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProductUnit = () => {
  const invalidate = useInvalidateProductUnits();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProductUnitVariables) =>
      updateProductUnit(id, data),
    onSuccess: async (_, variables) => {
      await invalidate(variables.productId);
      toast.success("Selling unit updated successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useArchiveProductUnit = () => {
  const invalidate = useInvalidateProductUnits();
  return useMutation({
    mutationFn: ({ id }: ProductUnitContext) => archiveProductUnit(id),
    onSuccess: async (_, variables) => {
      await invalidate(variables.productId);
      toast.success("Selling unit archived.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useRestoreProductUnit = () => {
  const invalidate = useInvalidateProductUnits();
  return useMutation({
    mutationFn: ({ id }: ProductUnitContext) => restoreProductUnit(id),
    onSuccess: async (_, variables) => {
      await invalidate(variables.productId);
      toast.success("Selling unit restored.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};