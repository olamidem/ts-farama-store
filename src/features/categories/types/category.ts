export interface Category {
  id: string;
  name: string;
  sku_prefix: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export type CreateCategoryInput = Omit<
  Category,
  "id" | "created_at" | "updated_at"
>;

export type UpdateCategoryInput = Partial<CreateCategoryInput>;
