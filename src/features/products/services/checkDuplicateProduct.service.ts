import { supabase } from "../../../api/supabase";

export async function checkDuplicateProduct(name: string, categoryId: string) {
  const normalizedName = name.trim().toLowerCase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", normalizedName)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
