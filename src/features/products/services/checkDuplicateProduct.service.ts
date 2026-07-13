import { supabase } from "../../../api/supabase";

export async function checkDuplicateProduct(name: string, categoryId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("name", name)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
