import Modal from "../../../components/ui/Modal";
import ProductForm from "./ProductForm";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Add Product">
      <div className="space-y-5">
        <p className="text-sm text-slate-500">Product form coming next...</p>
      </div>
      <ProductForm onCancel={onClose } />
    </Modal>
  );
};

export default AddProductModal;
