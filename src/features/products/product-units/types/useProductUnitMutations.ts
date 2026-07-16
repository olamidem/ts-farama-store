import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    archiveProductUnit,
  createProductUnit,
  restoreProductUnit,
  updateProductUnit,
} from "../services/productUnit.service";
import { QUERY_KEYS } from "../../../../lib/queryKey";
import type { UpdateProductUnitInput } from "./productUnit";

type UpdateProductUnitVariables = {
  id: string;
  data: UpdateProductUnitInput;
};

type ArchiveVariables = {
  id: string;
  productId: string;
};

export const useCreateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductUnit,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.productUnits, variables.product_id],
      });
      toast.success("Selling unit created successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProductUnitVariables) =>
      updateProductUnit(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.productUnits, variables.data.product_id],
      });
      toast.success("Selling unit updated successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useArchiveProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: ArchiveVariables) => archiveProductUnit(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.productUnits, variables.productId],
      });
      toast.success("Selling unit archived.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useRestoreProductUnit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }: ArchiveVariables) =>
            restoreProductUnit(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    ...QUERY_KEYS.productUnits,
                    variables.productId,
                ],
            });
            toast.success("Selling unit restored.");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};