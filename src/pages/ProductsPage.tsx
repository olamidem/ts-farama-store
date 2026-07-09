import { useState } from "react";
import ProductHeader from "../features/products/components/ProductHeader";
import ProductToolbar from "../features/products/components/ProductToolbar";
import { motion } from 'motion/react';
import { useProducts } from "../features/products/hooks/useProducts";
import ProductTable from "../features/products/components/ProductTable";
import LoadingScreen from "../components/common/LoadingScreen";
import AddProductModal from "../features/products/components/AddProductModal";
import { useCategories } from "../features/categories/hooks/useCategories";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();
  if (isLoading) {
    return <LoadingScreen text="Loading products..." />;
  }
  if (error) {
    return <div>Failed to load products.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 animate-fadeIn"
    >
      <div className="space-y-8">
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
        <ProductTable products={products} categories={ categories} />

        {/* Modal */}
        <AddProductModal
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </motion.div>
  );
};

export default ProductsPage;
