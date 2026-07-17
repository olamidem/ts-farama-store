import Button from "../../../../components/ui/Button";

interface ProductUnitsHeaderProps {
  showAddButton?: boolean;
  onAdd: () => void;
}

export default function ProductUnitsHeader({
  showAddButton = true,
  onAdd,
}: ProductUnitsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          Selling Units
        </h2>
        <p className="text-sm text-slate-500">
          Configure product selling units and pricing.
        </p>
      </div>

      {showAddButton && (
        <Button
          onClick={onAdd}
          size="sm"
        >
          Add Selling Unit
        </Button>
      )}
    </div>
  );
}