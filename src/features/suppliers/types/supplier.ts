export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  remarks?: string; // Can be parsed as JSON or treated as a plain text string
  created_at: string;
  updated_at: string;
}

export interface SupplierWithStats extends Supplier {
  contact_person: string;
  payment_terms: string;
  status: "Active" | "Inactive";
  remarks_text: string;

  // Computed stats
  totalPurchases: number;
  totalSpend: number;
  pendingPurchases: number;
  productsSupplied: number;
  lastPurchaseDate?: string;
  averageOrderValue: number;
  supplierSince: string;
}

export interface CreateSupplierInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  remarks?: string;
}

export type UpdateSupplierInput = Partial<CreateSupplierInput>;
