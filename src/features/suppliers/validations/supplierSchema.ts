import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  contact_person: z.string().optional().or(z.literal("")),
  payment_terms: z.string(),
  status: z.enum(["Active", "Inactive"]),
  remarks_text: z.string().optional().or(z.literal("")),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
