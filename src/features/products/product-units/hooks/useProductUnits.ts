import { useQuery } from "@tanstack/react-query";
import { getProductUnits } from "../services/productUnit.service";
import { QUERY_KEYS } from "../../../../lib/queryKey";

export const useProductUnits = (productId: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.productUnits, productId],
    queryFn: () => getProductUnits(productId),
    enabled: Boolean(productId),
  });
};

