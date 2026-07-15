import { STORE_SKU_PREFIX } from "../constant/sku";

export const generateSku = (
  categoryPrefix: string,
  sequence: number,
): string => {
  return `${STORE_SKU_PREFIX}-${categoryPrefix}-${String(sequence).padStart(6, "0")}`;
};
