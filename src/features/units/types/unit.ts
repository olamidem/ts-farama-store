export interface Unit {
  id: string;
  name: string;
  symbol: string;
  description?: string | null;
  is_system: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type CreateUnitInput = Omit<
  Unit,
  "id" | "created_at" | "updated_at" | "is_system"
>;
export type UpdateUnitInput = Partial<CreateUnitInput>;
