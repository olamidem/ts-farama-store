import { type Dispatch, type SetStateAction } from "react";
import { useSuppliers } from "../../hook/usePurchases";
import type { Supplier } from "../../types/supplier";
import Label from "../../../../components/ui/Label";
import Select from "../../../../components/ui/Select";

interface SupplierInformationProps {
  selectedSupplierId: string;
  onSupplierChange: Dispatch<SetStateAction<string>>;
}

const SupplierInformation = ({
  selectedSupplierId,
  onSupplierChange,
}: SupplierInformationProps) => {
  const { data: suppliers = [], isLoading } = useSuppliers();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-bold text-slate-800">
          Supplier Information
        </h2>
        <p className="text-sm text-slate-500">
          Select the supplier for this purchase order.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2">Supplier</Label>

          <Select
            value={selectedSupplierId}
            onChange={(event) => onSupplierChange(event.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Loading suppliers..." : "Select supplier"}
            options={suppliers.map((supplier: Supplier) => ({
              value: supplier.id,
              label: supplier.name,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierInformation;
