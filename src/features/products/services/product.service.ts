import { supabase } from "../../../api/supabase";
import type { BulkProductUpdate } from "../types/bulkUpdate";
import type { CreateProductInput, Product, UpdateProductInput } from "../types/product";
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

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    // .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProduct = async (
  id: string
): Promise<Product> => {
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
  product: UpdateProductInput
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
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
    supabase.
      from("products")
      .update(updates)
      .eq("id", id),
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

export const deleteProduct = async (
  id: string
): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

