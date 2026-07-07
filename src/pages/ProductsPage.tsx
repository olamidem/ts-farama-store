import { useState } from "react";
import ProductHeader from "../features/products/components/ProductHeader";
import ProductToolbar from "../features/products/components/ProductToolbar";
import { motion } from 'motion/react';

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
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

        {/* Modal */}
      </div>
    </motion.div>
  );
};

export default ProductsPage;
