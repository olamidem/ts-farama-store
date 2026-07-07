import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/product.service";
import type { CreateProductInput, UpdateProductInput } from "../types/product";

export const PRODUCT_QUERY_KEY = ["products"];

export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: getProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEY, id],
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
        queryKey: PRODUCT_QUERY_KEY,
      });
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
        queryKey: PRODUCT_QUERY_KEY,
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
        queryKey: PRODUCT_QUERY_KEY,
      });
    },
  });
};