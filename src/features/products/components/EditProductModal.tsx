import Modal from "../../../components/ui/Modal";
import { useUpdateProduct } from "../hooks/useProducts";
import ProductForm from "./ProductForm";
import type { Product, CreateProductInput } from "../types/product";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProductModal = ({
  open,
  onClose,
  product,
}: EditProductModalProps) => {
    const updateProduct = useUpdateProduct();
    
  if (!product) return null;
  const handleSubmit = async (data: CreateProductInput) => {
    await updateProduct.mutateAsync({
      id: product.id,
      product: data,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Edit ${product.name}`}>
      <ProductForm
        defaultValues={product}
        submitText="Save Changes"
        loading={updateProduct.isPending}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default EditProductModal;
