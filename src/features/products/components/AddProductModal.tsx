import Modal from "../../../components/ui/Modal";
import ProductForm from "./ProductForm";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Add Product">
      <ProductForm onCancel={onClose } />
    </Modal>
  );
};

export default AddProductModal;
