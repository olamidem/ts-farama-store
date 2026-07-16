import type { ProductWithRelations } from "../../products/types/product";
import type { ProductUnit } from "../types/productUnit";

interface ProductUnitListProps {
  product: ProductWithRelations;
  units: ProductUnit[];
}

const ProductUnitList = ({ product, units }: ProductUnitListProps) => {
  return <div>Product Unit List</div>;
};

export default ProductUnitList;
