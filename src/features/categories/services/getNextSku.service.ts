import { supabase } from "../../../api/supabase";
import { generateSku } from "../../../utils/generateSku";

export const getNextSku = async (
  categoryId: string,
  categoryPrefix: string,
): Promise<string> => {
  const { data, error } = await supabase
    .from("products")
    .select("sku")
    .eq("category_id", categoryId)
    .order("sku", { ascending: false })
    .limit(1);
  if (error) {
    throw new Error(error.message);
  }
  const latestSku = data?.[0]?.sku;
  if (!latestSku) {
    return generateSku(categoryPrefix, 1);
  }
const lastPart = latestSku.split("-").at(-1);
const sequence = Number(lastPart);

return generateSku(categoryPrefix, Number.isNaN(sequence) ? 1 : sequence + 1);
};
