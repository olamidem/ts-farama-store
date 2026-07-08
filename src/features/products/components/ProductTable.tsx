
import DataTable from "../../../components/ui/DataTable";
import type { Product } from "../types/product";
import { productColumns } from "./ProductColumns";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <DataTable
      data={products}
      columns={productColumns}
    />
  );
};

export default ProductTable;