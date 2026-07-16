import { supabase } from "../../../api/supabase";
import { throwSupabaseError } from "../../../utils/supabaseError";
import { formatSentenceCase } from "../../../utils/formatSentenceCase";
import type { Unit, CreateUnitInput, UpdateUnitInput } from "../types/unit";

export const getUnits = async (): Promise<Unit[]> => {
  const { data, error } = await supabase
    .from("units")
    .select("*")
    .order("name", { ascending: true });
  throwSupabaseError(error);
  return data || [];
};

export const createUnit = async (unit: CreateUnitInput): Promise<Unit> => {
  const payload = {
    ...unit,
    name: formatSentenceCase(unit.name),
    symbol: unit.symbol.trim(),
  };
  const { data, error } = await supabase
    .from("units")
    .insert(payload)
    .select()
    .single();
  throwSupabaseError(error);
  return data;
};

export const updateUnit = async (
  id: string,
  unit: UpdateUnitInput,
): Promise<Unit> => {
  const payload = {
    ...unit,
    ...(unit.name ? { name: formatSentenceCase(unit.name) } : {}),
    ...(unit.symbol ? { symbol: unit.symbol.trim() } : {}),
  };
  const { data, error } = await supabase
    .from("units")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  throwSupabaseError(error);
  return data;
};

export const archiveUnit = async (id: string): Promise<Unit> => {
  const { data, error } = await supabase
    .from("units")
    .update({ is_active: false })
    .eq("id", id)
    .select()
    .single();
  throwSupabaseError(error);
  return data;
};

export const restoreUnit = async (
  id: string,
): Promise<void> => {
  const { error } = await supabase
    .from("units")
    .update({
      is_active: true,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};