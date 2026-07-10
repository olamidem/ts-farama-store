import Button from "../../../components/ui/Button";
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
      <div className="space-y-6">
        {/* Description */}
        <div>
          <p className="text-sm text-slate-500">
            Update prices for{" "}
            <span className="font-semibold text-slate-700">
              {selectedProducts.length}
            </span>{" "}
            selected products.
          </p>
        </div>

        {/* Placeholder */}
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <p className="text-sm font-medium text-slate-500">
            Bulk update form coming next...
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>Apply Update</Button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkUpdateModal;
