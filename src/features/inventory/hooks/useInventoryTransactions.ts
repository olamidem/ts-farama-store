import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { getInventoryTransactions } from "../services/inventory.service";

export const useInventoryTransactions = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.inventory, "transactions"],
    queryFn: getInventoryTransactions,
  });
};
