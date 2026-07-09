import { supabase } from "../../../api/supabase";
import { throwSupabaseError } from "../../../utils/supabaseError";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return data;
};

export const createCategory = async (
  category: CreateCategoryInput,
): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();
  throwSupabaseError(error);
  return data;
};

export const updateCategory = async (
  id: string,
  category: UpdateCategoryInput,
): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select()
    .single();
  throwSupabaseError(error);
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  throwSupabaseError(error);
};
