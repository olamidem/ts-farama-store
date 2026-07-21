import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  product_id: z.string().uuid("Please select a valid product"),
  product_unit_id: z.string().uuid("Please select a valid product unit"),
  quantity: z
    .number()
    .refine((val) => val !== 0, { message: "Quantity cannot be zero" }),
  transaction_type: z.enum([
    "PURCHASE",
    "SALE",
    "RETURN",
    "ADJUSTMENT",
    "DAMAGE",
    "TRANSFER",
    "OPENING STOCK",
  ]),
  reference: z.string().min(3, "Reference must be at least 3 characters"),
  remarks: z.string().optional(),
});

export type StockAdjustmentFormData = z.infer<typeof stockAdjustmentSchema>;
