import { supabase } from "../../../api/supabase";
import type { CreateInventoryTransactionInput } from "../types/inventory";
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
      ),
      product_unit:product_units(
        id,
        conversion_factor,
        unit:units(
          id,
          name,
          abbreviation
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function createInventoryTransaction(
  input: CreateInventoryTransactionInput,
) {
  const { error } = await supabase.from("inventory_transactions").insert(input);

  if (error) throw error;
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