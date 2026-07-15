import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bulkUpdateProducts,
  createProduct,
  deactivateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  restoreProduct,
  updateProduct,
} from "../services/product.service";
import type { CreateProductInput, UpdateProductInput } from "../types/product";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";
import { QUERY_KEYS } from "../../../lib/queryKey";
import type { PaginationParams } from "../../../types/pagination";

export const useProducts = (params: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, params],
    queryFn: () => getProducts(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CreateProductInput) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: string;
      product: UpdateProductInput;
    }) => updateProduct(id, product),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useBulkUpdateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkUpdateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
      toast.success("Products updated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useRestoreProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreProduct,
    onSuccess: async () => {
      toast.success("Product restored successfully.");
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
    },
  });
};

export const useDeactivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
      toast.success("Product deactivated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};