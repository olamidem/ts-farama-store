import { supabase } from "../../../api/supabase";

export const checkSkuPrefixExists = async (
  skuPrefix: string,
  excludeId?: string,
): Promise<boolean> => {
  let query = supabase
    .from("categories")
    .select("id")
    .eq("sku_prefix", skuPrefix.toUpperCase());
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data, error } = await query.limit(1);
  if (error) {
    throw new Error(error.message);
  }
  return (data?.length ?? 0) > 0;
};