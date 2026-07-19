import { z } from "zod";

export const purchaseItemSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  product_unit_id: z.string().min(1, "Unit is required"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit_cost: z.number().positive("Unit cost must be greater than 0"),
});

export const purchaseSchema = z.object({
  supplier_id: z.string().min(1, "Supplier is required"),
  purchase_date: z.string().min(1, "Purchase date is required"),
  expected_delivery_date: z.string().optional(),
  warehouse_id: z.string().optional(),
  remarks: z.string().optional(),
  items: z
    .array(purchaseItemSchema)
    .min(1, "At least one purchase item is required"),
});

export type PurchaseItemFormValues = z.infer<typeof purchaseItemSchema>;
export type PurchaseFormValues = z.infer<typeof purchaseSchema>;
