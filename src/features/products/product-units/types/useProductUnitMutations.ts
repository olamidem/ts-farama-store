
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { createProductUnit } from "../services/productUnit.service";

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