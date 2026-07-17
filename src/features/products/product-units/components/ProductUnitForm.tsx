import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Sparkles, Barcode } from "lucide-react";
import type { Product } from "../../types/product";
import type { Unit } from "../../../units/types/unit";
import type { ProductUnit } from "../types/productUnit";
import {
  createProductUnitSchema,
  type ProductUnitFormData,
} from "../validation/productUnit.schema";
import Button from "../../../../components/ui/Button";
import {
  FormInput,
  FormNumberInput,
  FormSelect,
} from "../../../../components/forms";
import FormCurrencyInput from "../../../../components/forms/FormCurrencyInput";
import ProductUnitPreview from "./ProductUnitPreview";

interface ProductUnitsFormProps {
  product: Product;
  generalUnits: Unit[];
  editingUnit: ProductUnit | null;
  onSubmit: (
    productId: string,
    data: ProductUnitFormData
) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export const ProductUnitsForm = ({
  product,
  generalUnits,
  editingUnit,
  onSubmit,
  onCancel,
  isPending,
}: ProductUnitsFormProps) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<ProductUnitFormData>({
      resolver: zodResolver(createProductUnitSchema),
      defaultValues: {
        unit_id: "",
        conversion_factor: 1,
        selling_price: 0,
        cost_price: 0,
        sku: "",
        barcode: "",
      },
    });

  const watchedUnitId = watch("unit_id");
  const watchedConversion = watch("conversion_factor") || 1;

  const selectedUnit = useMemo(() => {
    return generalUnits.find((unit) => unit.id === watchedUnitId);
  }, [generalUnits, watchedUnitId]);

  const activeUnits = generalUnits.filter((unit) => unit.is_active);
  const handleAutoSuggest = () => {
  const factor = Number(watchedConversion) || 1;

  setValue("cost_price", product.cost_price * factor);

  setValue("selling_price", product.selling_price * factor);

    if (selectedUnit) {
      setValue("sku", `${product.sku}-${selectedUnit.symbol.toUpperCase()}`);
    }
  };

  useEffect(() => {
    if (editingUnit) {
      reset({
        unit_id: editingUnit.unit_id,
        conversion_factor: editingUnit.conversion_factor,
        selling_price: editingUnit.selling_price,
        cost_price: editingUnit.cost_price,
        sku: editingUnit.sku,
        barcode: editingUnit.barcode || "",
      });

      return;
    }

    reset({
      unit_id: "",
      conversion_factor: 1,
      selling_price: 0,
      cost_price: 0,
      sku: "",
      barcode: "",
    });
  }, [editingUnit, product.id, reset]);
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(product.id, data),
      )}
      className="p-5 border border-blue-100 bg-blue-50/20 rounded-2xl space-y-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 pb-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
          <Sparkles className="h-4 w-4 text-blue-500" />
          {editingUnit ? "Edit Selling Unit" : "New Selling Unit Configuration"}
        </h4>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAutoSuggest}
          disabled={!selectedUnit}
          className="flex items-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          Auto Calculate
        </Button>
      </div>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          control={control}
          name="unit_id"
          label="Selling Unit Of Measure"
          placeholder="Select unit..."
          options={activeUnits.map((unit) => ({
            label: `${unit.name} (${unit.symbol})`,
            value: unit.id,
          }))}
        />

        <FormNumberInput
          control={control}
          name="conversion_factor"
          label="Conversion Factor"
          placeholder="12"
          suffix={selectedUnit?.symbol}
        />

        <FormInput
          control={control}
          name="sku"
          label="Selling Unit SKU"
          placeholder="BEV-COKE-CTN"
          className="font-mono uppercase"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormCurrencyInput
          control={control}
          name="cost_price"
          label="Cost Price"
          placeholder="0.00"
        />

        <FormCurrencyInput
          control={control}
          name="selling_price"
          label="Selling Price"
          placeholder="0.00"
        />

        <FormInput
          control={control}
          name="barcode"
          label="Barcode (Optional)"
          placeholder="615110001"
          icon={<Barcode className="h-4 w-4" />}
          className="font-mono"
        />
      </div>

      {/* Preview */}
      {selectedUnit && (
        <ProductUnitPreview
          sku={watch("sku") ?? ""}
          barcode={watch("barcode") ?? ""}
        
        />
      )}

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={isPending}>
          {editingUnit ? "Save Changes" : "Create Selling Unit"}
        </Button>
      </div>
    </form>
  );
};
