import { supabase } from "../../../api/supabase";
import {
  PURCHASE_STATUS,
  type PurchaseStatus,
} from "../constant/purchase.constants";
import type {
  CreatePurchaseInput,
  Purchase,
  UpdatePurchaseInput,
} from "../types/purchase";
import type { PurchaseStats } from "../types/purchaseStats";
import type { ReceivePurchaseInput } from "../types/purchaseItem";
import { calculateReceivedPercentage } from "../utils/calculatePurchaseTotal";
import { generatePurchaseNumber } from "../utils/generatePurchaseNumber";
import type { Supplier } from "../types/supplier";

export async function getPurchases() {
  const { data, error } = await supabase
    .from("purchases")
    .select(
      `
      *,
      supplier:suppliers(*),

      items:purchase_items(
        *,
        product:products(*),
        product_unit:product_units(
          *,
          unit:units(*)
        )
      )
    `,
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Purchase[];
}

export async function getPurchase(id: string) {
  const { data, error } = await supabase
    .from("purchases")
    .select(
      `
      *,
      supplier:suppliers(*),

      items:purchase_items(
        *,
        product:products(*),
        product_unit:product_units(
          *,
          unit:units(*)
        )
      )
    `,
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Purchase;
}

export async function createPurchase(input: CreatePurchaseInput) {
  const total = input.items.reduce(
    (sum, item) => sum + item.quantity * item.unit_cost,
    0,
  );

  const purchaseNumber = await generatePurchaseNumber();

  const { data: purchase, error } = await supabase
    .from("purchases")
    .insert({
      purchase_number: purchaseNumber,
      supplier_id: input.supplier_id,
      purchase_date: input.purchase_date,
      expected_delivery_date: input.expected_delivery_date,
      remarks: input.remarks,
      total_amount: total,
       status: PURCHASE_STATUS.PENDING,
    })
    .select()
    .single();

  if (error) throw error;

  const items = input.items.map((item) => ({
    purchase_id: purchase.id,
    product_id: item.product_id,
    product_unit_id: item.product_unit_id,
    quantity: item.quantity,
    unit_cost: item.unit_cost,
    total_cost: item.quantity * item.unit_cost,
  }));

  const { error: itemError } = await supabase
    .from("purchase_items")
    .insert(items);
  if (itemError) throw itemError;
  return purchase;
}

export async function updatePurchase(id: string, input: UpdatePurchaseInput) {
  const { data, error } = await supabase
    .from("purchases")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePurchase(id: string) {
  const { error } = await supabase.from("purchases").delete().eq("id", id);
  if (error) throw error;
}

export async function receivePurchaseGoods({
  purchaseId,
  receivedItems,
}: ReceivePurchaseInput) {
  if (!receivedItems.length) {
    throw new Error("No items supplied.");
  }

  /**
   * Update received quantity for each purchase item
   */
  for (const item of receivedItems) {
    if (item.received_quantity <= 0) {
      throw new Error("Received quantity must be greater than zero.");
    }

    const { data: purchaseItem, error } = await supabase
      .from("purchase_items")
      .select(`id,product_id,quantity,product_unit_id,received_quantity`)
      .eq("id", item.purchase_item_id)
      .single();

    if (error) throw error;

    const currentReceived = purchaseItem.received_quantity ?? 0;
    const newReceived = currentReceived + item.received_quantity;

    if (newReceived > purchaseItem.quantity) {
      throw new Error("Received quantity cannot exceed ordered quantity.");
    }

    const { error: updateError } = await supabase
      .from("purchase_items")
      .update({
        received_quantity: newReceived,
      })
      .eq("id", item.purchase_item_id);

    if (updateError) throw updateError;
  }

  /**
   * Fetch all purchase items again
   */
  const { data: items, error: itemsError } = await supabase
    .from("purchase_items")
    .select("quantity, received_quantity")
    .eq("purchase_id", purchaseId);

  if (itemsError) throw itemsError;

  /**
   * Calculate overall received percentage
   */
  const receivedPercentage = calculateReceivedPercentage(items);

  /**
   * Determine purchase status
   */
  let status: PurchaseStatus = PURCHASE_STATUS.ORDERED;
  if (receivedPercentage > 0 && receivedPercentage < 100) {
    status = PURCHASE_STATUS.PARTIALLY_RECEIVED;
  }
  if (receivedPercentage === 100) {
    status = PURCHASE_STATUS.RECEIVED;
  }

  /**
   * Update purchase summary
   */
  const { error: purchaseError } = await supabase
    .from("purchases")
    .update({
      received_percentage: receivedPercentage,
      status,
    })
    .eq("id", purchaseId);
  if (purchaseError) throw purchaseError;

  return await getPurchase(purchaseId);
}

export async function getPurchaseStats(): Promise<PurchaseStats> {
  const purchases = await getPurchases();

  const pendingStatuses: PurchaseStatus[] = [
    PURCHASE_STATUS.PARTIALLY_RECEIVED,
    PURCHASE_STATUS.PENDING,
    PURCHASE_STATUS.APPROVED,
    PURCHASE_STATUS.ORDERED,
  ];

  return {
    totalOrders: purchases.length,

    pendingOrders: purchases.filter((purchase) =>
      pendingStatuses.includes(purchase.status),
    ).length,

    receivedOrders: purchases.filter(
      (purchase) => purchase.status === PURCHASE_STATUS.RECEIVED,
    ).length,

    partiallyReceivedOrders: purchases.filter(
      (purchase) => purchase.status === PURCHASE_STATUS.PARTIALLY_RECEIVED,
    ).length,

    totalPurchaseValue: purchases.reduce(
      (total, purchase) => total + purchase.total_amount,
      0,
    ),
  };
}

export async function getSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data as Supplier[];
}
