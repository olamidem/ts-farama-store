import Button from "../../../../components/ui/Button";

interface ProductUnitHeaderProps {
  totalUnits: number;
  onAddUnit: () => void;
}

const ProductUnitHeader = ({
  totalUnits,
  onAddUnit,
}: ProductUnitHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Selling Units</h2>

        <p className="text-sm text-slate-500">
          {totalUnits} {totalUnits === 1 ? "unit" : "units"} configured
        </p>
      </div>

      <Button variant="primary" onClick={onAddUnit}>
        + Add Selling Unit
      </Button>
    </div>
  );
};

export default ProductUnitHeader;
