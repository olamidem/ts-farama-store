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
import type { Product } from "../features/products/types/product";
import EditProductModal from "../features/products/components/EditProductModal";
import DeleteProductModal from "../features/products/components/DeleteProductModal";

const ProductsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();
  const [productToDeactivate, setProductToDeactivate] =
    useState<Product | null>(null);

  const selectedProducts = useMemo(() => {
    return products.filter((product) => rowSelection[String(product.id)]);
  }, [products, rowSelection]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.barcode ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "" || product.category_id === category;

      const matchesStatus =
        status === "all" ||
        (status === "active" && product.is_active) ||
        (status === "inactive" && !product.is_active);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleDeactivateProduct = (product: Product) => {
    setProductToDeactivate(product);
  };

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
        onAddProduct={() => setIsAddModalOpen(true)}
        onDownload={() => console.log("Download")}
      />
      {/* Toolbar */}
      <ProductToolbar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        categories={categories}
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
        products={filteredProducts}
        categories={categories}
        isLoading={isLoading}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onEdit={handleEditProduct}
        onDeactivate={handleDeactivateProduct}
      />

      {/* Modal */}
      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Modal for product bulks update */}
      <BulkUpdateModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onSuccess={() => setRowSelection({})}
        selectedProducts={selectedProducts}
      />

      {/* Edit product Modal */}
      <EditProductModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        product={selectedProduct}
      />

      <DeleteProductModal
        open={!!productToDeactivate}
        product={productToDeactivate}
        onClose={() => setProductToDeactivate(null)}
      />
    </motion.div>
  );
};

export default ProductsPage;
