import type { Unit } from "../../../units/types/unit";

export const generateProductUnitSku = (
  productSku: string,
  unit: Unit | undefined,
) => {
  if (!unit) return "";
  return `${productSku}-${unit.symbol.toUpperCase()}`;
};
