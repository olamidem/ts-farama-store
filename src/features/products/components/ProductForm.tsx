import { useEffect } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import Select from "../../../components/ui/Select";
import { useCategories } from "../../categories/hooks/useCategories";
import type { CreateProductInput } from "../types/product";
import {
  createProductSchema,
  type ProductFormData,
} from "../validation/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getNextSku } from "../../categories/services/getNextSku.service";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductInput>;
  loading?: boolean;
  submitText?: string;
  onCancel: () => void;
  onSubmit: (data: CreateProductInput) => Promise<void> | void;
}

const ProductForm = ({
  onCancel,
  defaultValues,
  loading = false,
  submitText = "Add Product",
  onSubmit,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    mode: "onChange",
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      barcode: "",
      sku: "",
      selling_price: 0,
      cost_price: 0,
      stock: 0,
      min_stock_alert: 10,
      category_id: "",
      ...defaultValues,
    },
  });

  const { data: categories = [] } = useCategories();

  const categoryOptions =
    categories.length === 0
      ? [
          {
            label: "No categories available",
            value: "",
          },
        ]
      : categories.map((category) => ({
          label: category.name,
          value: category.id,
        }));

  const selectedCategoryId = useWatch({
    control,
    name: "category_id",
  });

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );
  useEffect(() => {
    reset({
      name: defaultValues?.name ?? "",
      barcode: defaultValues?.barcode ?? "",
      sku: defaultValues?.sku ?? "",
      selling_price: defaultValues?.selling_price ?? 0,
      cost_price: defaultValues?.cost_price ?? 0,
      stock: defaultValues?.stock ?? 0,
      min_stock_alert: defaultValues?.min_stock_alert ?? 10,
      category_id: defaultValues?.category_id ?? "",
    });
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!selectedCategory) {
      setValue("sku", "");
      return;
    }

    const generateNextSku = async () => {
      try {
        const sku = await getNextSku(
          selectedCategory.id,
          selectedCategory.sku_prefix,
        );

        setValue("sku", sku, {
          shouldDirty: true,
          shouldValidate: true,
        });
      } catch (error) {
        console.error("Failed to generate SKU", error);
      }
      console.log("Generating SKU...");
    };

    generateNextSku();
  }, [selectedCategory, setValue]);

  console.log("Selected Category ID:", selectedCategoryId);
  console.log("Selected Category:", selectedCategory);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(async (data) => {
          const payload: CreateProductInput = {
            ...data,
            barcode: data.barcode?.trim() || "",
          };
          await onSubmit(payload);
          reset();
        })(e);
      }}
      className="space-y-5"
    >
      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          Product Name *
        </Label>

        <Input
          autoFocus
          id="name"
          {...register("name")}
          placeholder="e.g. Coca-Cola 50cl"
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-medium "
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          Barcode
        </Label>
        <Input
          id="barcode"
          {...register("barcode")}
          placeholder="Leave empty to auto-generate"
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-mono"
        />
        {errors.barcode && (
          <p className="text-xs text-red-500 mt-1">{errors.barcode.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="block text-[10px] font-bold text-slate-400 uppercase">
            Price (Selling) ₦ *
          </Label>
          <Input
            type="number"
            {...register("selling_price", { valueAsNumber: true })}
            placeholder="0.00"
            className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-mono "
          />
          {errors.selling_price && (
            <p className="text-xs text-red-500 mt-1">
              {errors.selling_price?.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="block text-[10px] font-bold text-slate-400 uppercase">
            Cost (Wholesale) ₦
          </Label>
          <Input
            type="number"
            {...register("cost_price", { valueAsNumber: true })}
            placeholder="0.00"
            className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-mono text-slate-600"
          />
          {errors.cost_price && (
            <p className="text-xs text-red-500 mt-1">
              {errors.cost_price?.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="block text-[10px] font-bold text-slate-400 uppercase">
            Stock Quantity *
          </Label>
          <Input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            placeholder="0"
            className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-mono"
          />
          {errors.stock && (
            <p className="text-xs text-red-500 mt-1">{errors.stock?.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="block text-[10px] font-bold text-slate-400 uppercase">
            Low Stock Alert Level
          </Label>
          <Input
            type="number"
            {...register("min_stock_alert", { valueAsNumber: true })}
            placeholder="10"
            className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none font-mono"
          />
          {errors.min_stock_alert && (
            <p className="text-xs text-red-500 mt-1">
              {errors.min_stock_alert?.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          Associated Category
        </Label>

        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-white"
            />
          )}
        />
      </div>

      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          SKU
        </Label>

        <Input
          {...register("sku")}
          readOnly
          className="w-full py-2 px-3 border border-slate-200 rounded-lg bg-slate-100 font-mono text-slate-700 cursor-not-allowed"
        />

        {errors.sku && (
          <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          disabled={!isValid || loading || categories.length === 0}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50 cursor-pointer"
        >
          {submitText ?? "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
