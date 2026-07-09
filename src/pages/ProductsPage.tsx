import { useState } from "react";
import { motion } from "motion/react";
import ProductHeader from "../features/products/components/ProductHeader";
import ProductToolbar from "../features/products/components/ProductToolbar";
import ProductTable from "../features/products/components/ProductTable";
import AddProductModal from "../features/products/components/AddProductModal";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategories } from "../features/categories/hooks/useCategories";
import ErrorState from "../components/common/ErrorState";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();

 if (error) {
   return (
     <ErrorState
       title="Unable to load products"
       description="We couldn't retrieve your products. Please try again."
     />
   );
 }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Header */}
      <ProductHeader
        onAddProduct={() => setOpen(true)}
        onDownload={() => console.log("Download")}
      />

      {/* Toolbar */}
      <ProductToolbar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {/* Table */}
      <ProductTable
        products={products}
        categories={categories}
        isLoading={isLoading}
      />

      {/* Modal */}
      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </motion.div>
  );
};

export default ProductsPage;
