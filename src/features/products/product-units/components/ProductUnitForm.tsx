import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateProductUnitSku } from "../utils/generateProductUnitSku";
import {
  createProductUnitSchema,
  type ProductUnitFormData,
} from "../validation/productUnit.schema";
import ProductUnitInformation from "./ProductUnitInformation";
import ProductUnitPreview from "./ProductUnitPreview";
import ProductUnitFooter from "./ProductUnitFooter";
import type { Product } from "../../types/product";
import type { Unit } from "../../../units/types/unit";
import { useCreateProductUnit } from "../hooks/useProductUnitMutations";
import { generateBarcode } from "../../utils/generateBarcode";
import ProductUnitPricing from "./ProductUnitPrcing";

interface ProductUnitFormProps {
  product: Product;
  units: Unit[];
  baseUnit: Unit;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ProductUnitForm = ({
  product,
  units,
  baseUnit,
  onCancel,
  onSuccess,
}: ProductUnitFormProps) => {
  const createProductUnit = useCreateProductUnit();

  const form = useForm<ProductUnitFormData>({
    resolver: zodResolver(createProductUnitSchema),
    mode: "onChange",
    defaultValues: {
      unit_id: "",
      conversion_factor: 1,
      selling_price: product.selling_price,
      cost_price: product.cost_price,
    },
  });

  const selectedUnitId = useWatch({
    control: form.control,
    name: "unit_id",
  });

  const conversionFactor = useWatch({
    control: form.control,
    name: "conversion_factor",
  });

  const sellingPrice = useWatch({
    control: form.control,
    name: "selling_price",
  });

  const costPrice = useWatch({
    control: form.control,
    name: "cost_price",
  });

  const selectedUnit = useMemo(
    () => units.find((unit) => unit.id === selectedUnitId),
    [units, selectedUnitId],
  );

  // Stateful previews
  const [skuPreview, setSkuPreview] = useState("");
  const [barcodePreview, setBarcodePreview] = useState(() => generateBarcode());

  // Update SKU whenever the selected unit changes
  useEffect(() => {
    if (!selectedUnit) {
      setSkuPreview("");
      return;
    }

    setSkuPreview(generateProductUnitSku(product.sku, selectedUnit));
  }, [selectedUnit, product.sku]);

  const profit = sellingPrice - costPrice;

  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  const resetForm = () => {
    form.reset({
      unit_id: "",
      conversion_factor: 1,
      selling_price: product.selling_price,
      cost_price: product.cost_price,
    });
    setSkuPreview("");
    setBarcodePreview(generateBarcode());
  };

  const submit = async (values: ProductUnitFormData) => {
    await createProductUnit.mutateAsync({
      product_id: product.id,
      unit_id: values.unit_id,
      conversion_factor: values.conversion_factor,
      selling_price: values.selling_price,
      cost_price: values.cost_price,
      barcode: barcodePreview,
      sku: skuPreview,
    });
    resetForm();
    onSuccess?.();
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <ProductUnitInformation
        control={form.control}
        units={units}
        baseUnitId={baseUnit.id}
        baseUnitName={baseUnit.name}
        selectedUnit={selectedUnit}
        conversionFactor={conversionFactor}
      />

      <ProductUnitPricing
        control={form.control}
        profit={profit}
        margin={margin}
      />

      <ProductUnitPreview sku={skuPreview} barcode={barcodePreview} />

      <ProductUnitFooter
        loading={createProductUnit.isPending}
        onCancel={onCancel}
      />
    </form>
  );
};

export default ProductUnitForm;
