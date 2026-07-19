export interface Supplier {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateSupplierInput {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export type UpdateSupplierInput = Partial<CreateSupplierInput>;
