import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../products/types/product";
import { useUnits } from "../../units/hooks/useUnits";
import {
  useProductUnits,
  useCreateProductUnit,
  useUpdateProductUnit,
  useDeleteProductUnit,
} from "./useProductUnitMutations";
import {
  createProductUnitSchema,
  type ProductUnitFormData,
} from "../validation/product-unit.schema";

export function useProductUnitForm(product: Product) {}
