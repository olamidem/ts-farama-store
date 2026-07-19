import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase";
import { QUERY_KEYS } from "../../../lib/queryKey";
import { toast } from "sonner";
import type { RecordInventoryTransactionInput } from "../types/inventoryTransaction";

export async function getInventoryTransactions() {
  const { data, error } = await supabase
    .from("inventory_transactions")
    .select(`
      *,
      product:products(
        id,
        name,
        sku
      )
    `)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function recordInventoryTransaction(
  input: RecordInventoryTransactionInput,
) {
  const { error } = await supabase.rpc("record_inventory_transaction", {
    p_product_id: input.product_id,
    p_product_unit_id: input.product_unit_id,
    p_transaction_type: input.transaction_type,
    p_quantity: input.quantity,
    p_reason: input.reason,
    p_remarks: input.remarks,
  });
  if (error) throw error;
}

export function useRecordInventoryTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recordInventoryTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.inventoryTransactions,
      });
      toast.success("Inventory updated successfully.");
    },
  });
}

