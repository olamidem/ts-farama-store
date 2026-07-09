import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/product.service";
import type { CreateProductInput, UpdateProductInput } from "../types/product";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";
import { QUERY_KEYS } from "../../../lib/queryKey";

export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: getProducts,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
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