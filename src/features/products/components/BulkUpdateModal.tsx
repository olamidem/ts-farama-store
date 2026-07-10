import Modal from "../../../components/ui/Modal";
import type { Product } from "../types/product";

interface BulkUpdateModalProps {
  open: boolean;
  onClose: () => void;
  selectedProducts: Product[];
}

const BulkUpdateModal = ({
  open,
  onClose,
  selectedProducts,
}: BulkUpdateModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Bulk Update Prices">
      {/* Update Type */}
      ...
      {/* Update Method */}
      ...
      {/* Operation */}
      ...
      {/* Amount */}
      ...
      {/* Live Preview */}
      ...
      {/* Footer */}
    </Modal>
  );
};

export default BulkUpdateModal;
