import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductHeader from "../features/products/components/ProductHeader";
import ProductToolbar from "../features/products/components/ProductToolbar";
import ProductTable from "../features/products/components/ProductTable";
import AddProductModal from "../features/products/components/AddProductModal";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategories } from "../features/categories/hooks/useCategories";
import ErrorState from "../components/common/ErrorState";
import type { RowSelectionState } from "@tanstack/react-table";
import ProductBulkActions from "../features/products/components/ProductBulkActions";
import BulkUpdateModal from "../features/products/components/BulkUpdateModal";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();

  const selectedProducts = useMemo(() => {
    return products.filter((product) => rowSelection[String(product.id)]);
  }, [products, rowSelection]);

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

      {/* Bulk Selection for Update */}
      <AnimatePresence mode="wait">
        {selectedProducts.length > 0 && (
          <ProductBulkActions
            selectedCount={selectedProducts.length}
            onClearSelection={() => setRowSelection({})}
            onBulkUpdate={() => setBulkModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Table */}
      <ProductTable
        products={products}
        categories={categories}
        isLoading={isLoading}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      {/* Modal */}
      <AddProductModal open={open} onClose={() => setOpen(false)} />

      {/* Modal for product bulks update */}
      <BulkUpdateModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        selectedProducts={selectedProducts}
      />
    </motion.div>
  );
};

export default ProductsPage;
