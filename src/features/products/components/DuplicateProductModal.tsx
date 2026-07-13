import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import type { Product } from "../types/product";

interface DuplicateProductModalProps {
  open: boolean;
  product: Product | null;
  onCancel: () => void;
  onCreateAnyway: () => void;
  onViewProduct?: () => void;
}

const DuplicateProductModal = ({
  open,
  product,
  onCancel,
  onCreateAnyway,
  onViewProduct,
}: DuplicateProductModalProps) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onCancel} title="Duplicate Product Found">
      <div className="space-y-6">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-semibold text-amber-800">
            A similar product already exists.
          </h3>

          <p className="mt-2 text-sm text-amber-700">
            Creating another product with the same name and category may split
            your inventory.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-xs uppercase text-slate-500">SKU</p>

            <p className="font-semibold">{product.sku}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Barcode</p>

            <p className="font-mono">{product.barcode}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Product Name</p>

            <p className="font-medium">{product.name}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Stock</p>

            <p className="font-semibold">{product.stock}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Status</p>

            <Badge variant={product.is_active ? "success" : "danger"}>
              {product.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          {onViewProduct && (
            <Button variant="secondary" onClick={onViewProduct}>
              View Product
            </Button>
          )}

          <Button variant="danger" onClick={onCreateAnyway}>
            Create Anyway
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateProductModal;
