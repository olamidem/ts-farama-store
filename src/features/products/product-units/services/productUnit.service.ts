import { supabase } from "../../../../api/supabase";
import { throwSupabaseError } from "../../../../utils/supabaseError";
import type { CreateProductUnitInput, ProductUnit, UpdateProductUnitInput } from "../types/productUnit";



export const getProductUnits = async (
  productId: string,
): Promise<ProductUnit[]> => {
  const { data, error } = await supabase
    .from("product_units")
    .select(
      ` *, unit:units(
        id,
        name,
        symbol
      )
    `,
    )
    .eq("product_id", productId)
    .order("sort_order");
  throwSupabaseError(error);
  return (
    data?.map((item) => ({
      ...item,
      unit_name: item.units?.name ?? "",
      unit_symbol: item.units?.symbol ?? "",
    })) ?? []
  );
};

export const createProductUnit = async (
    payload: CreateProductUnitInput,
): Promise<ProductUnit> => {
    const { data, error } = await supabase
      .from("product_units")
      .insert(payload)
      .select()
      .single();
     throwSupabaseError(error);
    return data;
};

export const updateProductUnit = async (
    id: string,
    payload: UpdateProductUnitInput,
): Promise<ProductUnit> => {
    const { data, error } = await supabase
        .from("product_units")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
    throwSupabaseError(error);
    return data;
};

export const archiveProductUnit = async (
    id: string,
): Promise<ProductUnit> => {
    const { data, error } = await supabase
        .from("product_units")
        .update({
            is_active: false,
        })
        .eq("id", id)
        .select()
        .single();
     throwSupabaseError(error);
    return data;
};

export const restoreProductUnit = async (
    id: string,
): Promise<ProductUnit> => {
    const { data, error } = await supabase
        .from("product_units")
        .update({
            is_active: true,
        })
        .eq("id", id)
        .select()
        .single();
     throwSupabaseError(error);
    return data;
};