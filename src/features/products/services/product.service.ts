import { supabase } from "../../../api/supabase";
import type {
  PaginatedResponse,
  PaginationParams,
} from "../../../types/pagination";
import { getNextSku } from "../../categories/services/getNextSku.service";
import type { Category } from "../../categories/types/category";
import type { BulkProductUpdate } from "../types/bulkUpdate";
import type { ValidatedImportRecord } from "../types/import";
import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product";
import { buildProductPayload } from "../utils/buildProductPayload";


export const createProduct = async (
  product: CreateProductInput,
): Promise<Product> => {
  const payload = buildProductPayload(product);
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProducts = async ({
  page,
  pageSize,
  search,
  category,
  status,
  sortBy = "created_at",
  ascending = false,
}: PaginationParams): Promise<PaginatedResponse<Product>> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("products").select("*", { count: "exact" });
  // Search
  if (search?.trim()) {
    query = query.or(`name.ilike.%${search}%,barcode.ilike.%${search}%`);
  }
  // Category
  if (category) {
    query = query.eq("category_id", category);
  }
  // Status
  if (status === "active") {
    query = query.eq("is_active", true);
  }
  if (status === "inactive") {
    query = query.eq("is_active", false);
  }
  // Sorting
  query = query.order(sortBy, {
    ascending,
  });
  // Pagination
  query = query.range(from, to);
  const { data, error, count } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return {
    data: data ?? [],
    count: count ?? 0,
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateProduct = async (
  id: string,
  payload: UpdateProductInput,
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const bulkUpdateProducts = async (
  products: BulkProductUpdate[],
): Promise<void> => {
  const updates = products.map(({ id, updates }) =>
    supabase.from("products").update(updates).eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) {
    throw new Error(failed.error.message);
  }
};

export const deactivateProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .update({
      is_active: false,
    })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export const restoreProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .update({
      is_active: true,
    })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export const bulkCreateImportProducts = async (
  products: CreateProductInput[],
  categories: Category[],
): Promise<void> => {
  if (products.length === 0) return;
  const payload = await Promise.all(
    products.map(async (product) => {
      const category = categories.find((c) => c.id === product.category_id);
      if (!category) {
        throw new Error(`Category not found for product "${product.name}"`);
      }
      const sku = await getNextSku(category.id, category.sku_prefix);
      return buildProductPayload({
        ...product,
        sku,
      });
    }),
  );
  const { error } = await supabase.from("products").insert(payload);
  if (error) {
    throw new Error(error.message);
  }
};


export const bulkUpdateImportProducts = async (
  products: ValidatedImportRecord[],
): Promise<void> => {
  if (products.length === 0) return;
  for (const product of products) {
    if (!product.duplicateProduct) continue;
    const payload = buildProductPayload({
      name: product.name,
      barcode: product.barcode,
      sku: product.sku,
      selling_price: product.selling_price,
      cost_price: product.cost_price,
      stock: product.stock,
      category_id: product.category_id,
      min_stock_alert: product.min_stock_alert,
      is_active: true,
    });
    const { error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", product.duplicateProduct.id);
    if (error) {
      throw new Error(error.message);
    }
  }
};

// export const bulkUpdateImportProducts = async (
//   products: ValidatedImportRecord[],
// ): Promise<void> => {
//   if (products.length === 0) return;
//   for (const product of products) {
//     if (!product.duplicateProduct) continue;
//     const payload = buildProductPayload({
//       name: product.name,
//       barcode: product.barcode,
//       sku: product.sku,
//       selling_price: product.selling_price,
//       cost_price: product.cost_price,
//       stock: product.stock,
//       category_id: product.category_id,
//       min_stock_alert: product.min_stock_alert,
//       is_active: true,
//     });

//     const { error } = await supabase
//       .from("products")
//       .update(payload)
//       .eq("id", product.duplicateProduct.id);

//     if (error) {
//       throw new Error(error.message);
//     }
//   }
// };