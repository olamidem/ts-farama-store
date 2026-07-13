/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { RowSelectionState } from "@tanstack/react-table";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/ui/pagination/Pagination";
import ProductHeader from "../features/products/components/ProductHeader";
import ProductToolbar from "../features/products/components/ProductToolbar";
import ProductTable from "../features/products/components/ProductTable";
import ProductBulkActions from "../features/products/components/ProductBulkActions";
import AddProductModal from "../features/products/components/AddProductModal";
import EditProductModal from "../features/products/components/EditProductModal";
import DeleteProductModal from "../features/products/components/DeleteProductModal";
import RestoreProductModal from "../features/products/components/RestoreProductModal";
import BulkUpdateModal from "../features/products/components/BulkUpdateModal";
import ProductImportModal from "../features/products/components/ProductImportModal";
import ExportProductDropdown from "../features/products/components/ExportProductDropdown";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategories } from "../features/categories/hooks/useCategories";
import type { Product } from "../features/products/types/product";

const ProductsPage = () => {
  // ==========================
  // Modals


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  // ==========================
  // Filters
  // ==========================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("all");

  // ==========================
  // Pagination
  // ==========================

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(() => {
    const saved = localStorage.getItem("products-page-size");
    return saved ? Number(saved) : 10;
  });

  // ==========================
  // Sorting
  // ==========================

  const [sortBy, setSortBy] = useState<
    "created_at" | "name" | "selling_price" | "stock"
  >("created_at");

  const [ascending, setAscending] = useState(false);

  // ==========================
  // Table Selection
  // ==========================

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // ==========================
  // Selected Product
  // ==========================

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeactivate, setProductToDeactivate] =
    useState<Product | null>(null);
  const [productToRestore, setProductToRestore] = useState<Product | null>(
    null,
  );

  // ==========================
  // Categories
  // ==========================

  const { data: categories = [] } = useCategories();

  // ==========================
  // Products
  // ==========================

  const { data, isLoading, error } = useProducts({
    page,
    pageSize,
    search,
    category,
    status: status as "all" | "active" | "inactive",
    sortBy,
    ascending,
  });

  const products = useMemo(() => data?.data ?? [], [data?.data]);
  const totalProducts = data?.count ?? 0;

  // ==========================
  // Selected Products
  // ==========================

  const selectedProducts = useMemo(() => {
    return products.filter((product) => rowSelection[product.id]);
  }, [products, rowSelection]);

  // ==========================
  // Persist page size
  // ==========================

  useEffect(() => {
    localStorage.setItem("products-page-size", String(pageSize));
  }, [pageSize]);

  // ==========================
  // Reset page when filters change
  // ==========================

  useEffect(() => {
    setPage(1);
  }, [search, category, status]);

  // ==========================
  // Clear selection when page changes
  // ==========================

  useEffect(() => {
    setRowSelection({});
  }, [page, pageSize]);

  // ==========================
  // Handlers
  // ==========================

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

  const handleRestoreProduct = (product: Product) => {
    setProductToRestore(product);
  };

  const handleSort = (
    column: "created_at" | "name" | "selling_price" | "stock",
  ) => {
    if (sortBy === column) {
      setAscending((prev) => !prev);
    } else {
      setSortBy(column);
      setAscending(true);
    }
    setPage(1);
  };

  // ==========================
  // Error
  // ==========================

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
      <ProductHeader
        onAddProduct={() => setIsAddModalOpen(true)}
        onImportProduct={() => setIsImportModalOpen(true)}
        exportMenu={
          <ExportProductDropdown
            products={products}
            filteredProducts={products}
            categories={categories}
          />
        }
      />

      <ProductToolbar
        search={search}
        category={category}
        status={status}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      <AnimatePresence mode="wait">
        {selectedProducts.length > 0 && (
          <ProductBulkActions
            selectedCount={selectedProducts.length}
            onClearSelection={() => setRowSelection({})}
            onBulkUpdate={() => setBulkModalOpen(true)}
          />
        )}
      </AnimatePresence>

      <ProductTable
        products={products}
        categories={categories}
        isLoading={isLoading}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onEdit={handleEditProduct}
        onDeactivate={handleDeactivateProduct}
        onRestore={handleRestoreProduct}
        sortBy={sortBy}
        ascending={ascending}
        onSort={handleSort}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalProducts}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />

      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onViewExisting={(product) => {
          setIsAddModalOpen(false);
          setSelectedProduct(product);
          setIsEditModalOpen(true);
        }}
      />

      <ProductImportModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        existingProducts={products}
        categories={categories}
      />

      <BulkUpdateModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onSuccess={() => setRowSelection({})}
        selectedProducts={selectedProducts}
      />

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

      <RestoreProductModal
        open={!!productToRestore}
        product={productToRestore}
        onClose={() => setProductToRestore(null)}
      />
    </motion.div>
  );
};

export default ProductsPage;
