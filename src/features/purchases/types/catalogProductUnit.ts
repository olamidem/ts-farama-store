export interface CatalogUnit {
  id: string;
  name: string;
  symbol: string;
}

export interface CatalogProductUnit {
  id: string;
  product_id: string;
  conversion_factor: number;
  unit: CatalogUnit | null;
}
