import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { getProductsForUnits, getUnits } from "../services/unit.service";

export const useUnits = () => {
  return useQuery({
    queryKey: QUERY_KEYS.units,
    queryFn: getUnits,
  });
};

export const useProductsForUnits = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.units, "products-summary"],
    queryFn: getProductsForUnits,
  });
};


