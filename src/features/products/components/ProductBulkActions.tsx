import { motion } from "motion/react";
import Button from "../../../components/ui/Button";
import { PencilLine, Trash2, X } from "lucide-react";

interface ProductBulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkUpdate: () => void;
  onBulkDelete: () => void;
}

const ProductBulkActions = ({
  selectedCount,
  onClearSelection,
  onBulkUpdate,
  onBulkDelete,
}: ProductBulkActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-4"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
        </span>

        <span className="text-sm font-medium text-blue-700">
          for bulk actions
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onClick={onClearSelection}>
          <X size={16} />
          Clear Selection
        </Button>

        <Button size="sm" onClick={onBulkUpdate}>
          <PencilLine size={16} />
          Bulk Update Prices
        </Button>

        <Button size="sm" variant="danger" onClick={onBulkDelete}>
          <Trash2 size={16} />
          Batch Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductBulkActions;
