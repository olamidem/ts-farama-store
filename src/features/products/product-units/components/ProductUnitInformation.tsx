import { useMemo } from "react";
import type { Control } from "react-hook-form";
import type { ProductUnitFormData } from "../validation/productUnit.schema";
import type { Unit } from "../../../units/types/unit";
import FormSelect from "../../../../components/forms/FormSelect";
import { FormNumberInput } from "../../../../components/forms";

interface ProductUnitInformationProps {
  control: Control<ProductUnitFormData>;
  units: Unit[];
  baseUnitId: string;
  baseUnitName: string;
  selectedUnit?: Unit;
  conversionFactor: number;
}

const ProductUnitInformation = ({
  control,
  units,
  baseUnitId,
  baseUnitName,
  selectedUnit,
  conversionFactor,
}: ProductUnitInformationProps) => {
  const unitOptions = useMemo(
    () =>
      units
        .filter((unit) => unit.id !== baseUnitId)
        .map((unit) => ({
          label: `${unit.name} (${unit.symbol})`,
          value: unit.id,
        })),
    [units, baseUnitId],
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5">
      <h3 className="text-sm font-semibold text-slate-700">Selling Unit</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          control={control}
          name="unit_id"
          label="Selling Unit"
          options={unitOptions}
          placeholder="Select unit"
        />

        <FormNumberInput
          control={control}
          name="conversion_factor"
          label={`Equivalent (${baseUnitName})`}
          min={1}
          placeholder="24"
        />
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Conversion Preview
        </p>

        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="rounded-lg bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Selling Unit</p>
            <p className="text-lg font-semibold">
              {selectedUnit?.name ?? "--"}
            </p>
          </div>

          <div className="text-2xl font-bold text-slate-400">=</div>
          <div className="rounded-lg bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Base Unit</p>
            <p className="text-lg font-semibold">
              {conversionFactor || 0} {baseUnitName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUnitInformation;
