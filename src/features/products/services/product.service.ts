import { supabase } from "../../../api/supabase";
import type { CreateProductInput, Product, UpdateProductInput } from "../types/product";

export const createProduct = async (
  product: CreateProductInput
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
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
    .eq("is_active", true)
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