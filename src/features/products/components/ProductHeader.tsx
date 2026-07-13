import { Plus, Upload } from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";

interface ProductHeaderProps {
  onAddProduct: () => void;
  onImportProduct: () => void;
  exportMenu: React.ReactNode;
}

const ProductHeader = ({
  onAddProduct,
  onImportProduct,
  exportMenu,
}: ProductHeaderProps) => {
  return (
    <PageHeader
      title="Manage Products"
      description="Configure store catalogue pricing, track barcode numbers, cost points and current stocks."
    >
      <div className="flex flex-wrap items-center gap-2">
        {exportMenu}
        <Button
          variant="secondary"
          onClick={onImportProduct}
          className="flex items-center gap-1.5"
        >
          <Upload size={18} />
          <span>Import Products</span>
        </Button>

        <Button onClick={onAddProduct} className="flex items-center gap-1.5">
          <Plus size={18} />
          <span>Add Product</span>
        </Button>
      </div>
    </PageHeader>
  );
};

export default ProductHeader;
