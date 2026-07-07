import { Download, Plus } from "lucide-react";
import Button from "../../../components/ui/Button";

interface ProductHeaderProps {
  onAddProduct: () => void;
  onDownload?: () => void;
}

const ProductHeader = ({ onAddProduct, onDownload }: ProductHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold uppercase tracking-tight text-slate-900">
          Manage Products
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Configure store catalogue pricing, track barcode numbers, cost points,
          and current stocks.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onDownload}>
          <Download size={18} />
          Download Inventory
        </Button>

        <Button onClick={onAddProduct}>
          <Plus size={18} />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
