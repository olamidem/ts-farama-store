import { useQuery } from "@tanstack/react-query";
import {
  getCatalogProducts,
  getCatalogProductUnits,
} from "../services/catalog.service";

export function useCatalogProducts() {
  return useQuery({
    queryKey: ["catalog-products"],
    queryFn: getCatalogProducts,
  });
}

export function useCatalogProductUnits() {
  return useQuery({
    queryKey: ["catalog-product-units"],
    queryFn: getCatalogProductUnits,
  });
}
