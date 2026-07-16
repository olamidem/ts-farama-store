import { useProductUnits } from "../hooks/useProductUnits";
import ProductUnitForm from "./ProductUnitForm";
import ProductUnitList from "./ProductUnitList";
import EmptySellingUnits from "./EmptySellingUnits";
import LoadingSellingUnits from "./LoadingSellingUnits";
import type { ProductWithRelations } from "../../products/types/product";

interface ProductSellingUnitsProps {
  product: ProductWithRelations;
}

const ProductSellingUnits = ({ product }: ProductSellingUnitsProps) => {
  const { data: units = [], isLoading } = useProductUnits(product.id);

  if (isLoading) {
    return <LoadingSellingUnits />;
  }

  return (
    <div className="space-y-6">
      <ProductUnitForm product={product} />

      {units.length === 0 ? (
        <EmptySellingUnits />
      ) : (
        <ProductUnitList product={product} units={units} />
      )}
    </div>
  );
};

export default ProductSellingUnits;
