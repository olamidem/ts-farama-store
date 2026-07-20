import type { SupplierFormData } from "../validations/supplierSchema";

export function validateSupplier(data: Partial<SupplierFormData>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Supplier name must be at least 2 characters";
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  
  return errors;
}
