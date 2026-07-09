import DataTable from "../../../components/ui/DataTable";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { productColumns } from "./ProductColumns";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
}

const ProductTable = ({ products, categories }: ProductTableProps) => {
  const columns = productColumns(categories);

  return <DataTable data={products} columns={columns} />;
};

export default ProductTable;
