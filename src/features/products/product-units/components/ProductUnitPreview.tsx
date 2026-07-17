import Input from "../../../../components/ui/Input";
import Label from "../../../../components/ui/Label";

interface ProductUnitPreviewProps {
  sku: string;
  barcode?: string;
}

const ProductUnitPreview = ({ sku, barcode }: ProductUnitPreviewProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5">
      <h3 className="text-sm font-semibold text-slate-700">
        Product Identification
      </h3>

      <div className="space-y-4">
        <div>
          <Label className="block text-[10px] font-bold uppercase text-slate-400">
            SKU
          </Label>

          <Input
            readOnly
            value={sku}
            className="bg-slate-100 font-mono cursor-not-allowed"
          />
        </div>

        <div>
          <Label className="block text-[10px] font-bold uppercase text-slate-400">
            Barcode
          </Label>

          <Input
            readOnly
            value={barcode ?? ""}
            className="bg-slate-100 font-mono cursor-not-allowed"
          />
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs text-amber-700">
          SKU and barcode are generated automatically. They uniquely identify
          this selling unit.
        </p>
      </div>
    </div>
  );
};

export default ProductUnitPreview;
