import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useCreateProduct } from "../hooks/useProducts";
import type { CreateProductInput, Product } from "../types/product";
import ProductForm from "./ProductForm";
import { checkDuplicateProduct } from "../services/checkDuplicateProduct.service";
import DuplicateProductModal from "./DuplicateProductModal";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onViewExisting: (product: Product) => void;
}

const AddProductModal = ({ open, onClose, onViewExisting }: AddProductModalProps) => {
  const [duplicateProduct, setDuplicateProduct] = useState<Product | null>(
    null,
  );
  const [pendingProduct, setPendingProduct] =
    useState<CreateProductInput | null>(null);
  const addProduct = useCreateProduct();

  const handleSubmit = async (values: CreateProductInput) => {
   const duplicate = await checkDuplicateProduct(
     values.name.trim(),
     values.category_id,
   );
    if (duplicate) {
      setDuplicateProduct(duplicate);
      setPendingProduct(values);
      return;
    }
    await addProduct.mutateAsync(values);
    onClose();
  };

  const handleCreateAnyway = async () => {
    if (!pendingProduct) return;
    await addProduct.mutateAsync(pendingProduct);
    setDuplicateProduct(null);
    setPendingProduct(null);
    onClose();
  };
  return (
    <>
      <Modal open={open} onClose={onClose} title="Add Product" size="sm">
        <ProductForm
        isEditing={false}
          onCancel={onClose}
          onSubmit={handleSubmit}
          loading={addProduct.isPending}
          submitText="Add Product"
        />
      </Modal>

      <DuplicateProductModal
        open={!!duplicateProduct}
        product={duplicateProduct}
        onCancel={() => {
          setDuplicateProduct(null);
          setPendingProduct(null);
        }}
        onCreateAnyway={handleCreateAnyway}
         onViewProduct={() => {
        if (!duplicateProduct) return;
        setDuplicateProduct(null);
        onViewExisting(duplicateProduct);
    }}
      />
    </>
  );
};

export default AddProductModal;
