import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../services/category.service";
import { toast } from "sonner";
import { getReadableError } from "../../../utils/error";
import { QUERY_KEYS } from "../../../lib/queryKey";


export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: CreateCategoryInput) => createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      category,
    }: {
      id: string;
      category: UpdateCategoryInput;
    }) => updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(getReadableError(error));
    },
  });
};
