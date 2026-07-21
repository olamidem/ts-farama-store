import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import {
  getInventorySummary,
  getProductStockOverview,
} from "../services/inventory.service";

export const useInventorySummary = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.inventory, "summary"],
    queryFn: getInventorySummary,
  });
};

export const useProductStockOverview = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.inventory, "stock-overview"],
    queryFn: getProductStockOverview,
  });
};
