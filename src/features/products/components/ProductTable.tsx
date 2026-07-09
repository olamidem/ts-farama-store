import DataTable from "../../../components/ui/DataTable/DataTable";
import DataTableSkeleton from "../../../components/ui/DataTable/DataTableSkeleton";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { productColumns } from "./ProductColumns";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  isLoading?: boolean;
}

const ProductTable = ({
  products,
  categories,
  isLoading = false,
}: ProductTableProps) => {
  if (isLoading) {
    return <DataTableSkeleton rows={8} columns={7} />;
  }

  const columns = productColumns(categories);

  return <DataTable data={products} columns={columns} />;
};

export default ProductTable;
