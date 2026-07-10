import Modal from "../../../components/ui/Modal";
import { useCreateProduct } from "../hooks/useProducts";
import type { CreateProductInput } from "../types/product";
import ProductForm from "./ProductForm";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const addProduct = useCreateProduct();

  const handleSubmit = async (data: CreateProductInput) => {
    await addProduct.mutateAsync(data);
    console.log(data);
    
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="Add Product">
      <ProductForm
        onCancel={onClose}
        onSubmit={handleSubmit}
        loading={addProduct.isPending}
        submitText="Add Product"
      />
    </Modal>
  );
};

export default AddProductModal;
