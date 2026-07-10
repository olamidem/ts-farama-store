
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useDeleteProduct } from "../hooks/useProducts";
import type { Product } from "../types/product";

interface DeleteProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

const DeleteProductModal = ({
  open,
  product,
  onClose,
}: DeleteProductModalProps) => {
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct.mutateAsync(product.id);
      onClose();
    } catch {
      // Toast is handled in the mutation hook.
    }
  };

  return (
    <ConfirmDialog
      open={open}
      title="Delete Product"
      description={`Are you sure you want to permanently delete "${product?.name}"? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      confirmVariant="danger"
      loading={deleteProduct.isPending}
      onConfirm={handleDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteProductModal;
