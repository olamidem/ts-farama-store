import { supabase } from "../../../../api/supabase";
import { throwSupabaseError } from "../../../../utils/supabaseError";
import type { Product } from "../../types/product";


export const createDefaultProductUnit = async (
  product: Product,
): Promise<void> => {
  const { error } = await supabase
    .from("product_units")
    .insert({
      product_id: product.id,
      unit_id: product.base_unit_id,
      conversion_factor: 1,
      selling_price: product.selling_price,
      cost_price: product.cost_price,
      barcode: product.barcode,
      is_default: true,
      is_active: true,
      sort_order: 1,
    });
  throwSupabaseError(error);
};

