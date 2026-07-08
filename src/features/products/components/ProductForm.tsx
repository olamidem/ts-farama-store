import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import Select from "../../../components/ui/Select";
import type { CreateProductInput } from "../types/product";
import {
  createProductSchema,
  type ProductFormData,
} from "../validation/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductInput>;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (data: CreateProductInput) => Promise<void> | void;
}

const categoryOptions = [
  {
    label: "Beverages",
    value: "beverages",
  },
  {
    label: "Groceries",
    value: "groceries",
  },
];

const ProductForm = ({
  onCancel,
  defaultValues,
  loading = false,
  onSubmit,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      barcode: "",
      selling_price: 0,
      cost_price: 0,
      stock: 0,
      min_stock_alert: 10,
      category_id: "",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const payload: CreateProductInput = {
          ...data,
          barcode: data.barcode?.trim() || "",
        };
        onSubmit(payload);
      })}
      className="space-y-5"
    >
      <div className="space-y-1">
        <Label className="block text-[10px] font-bold text-slate-400 uppercase">
          Product Name *
        </Label>

        <Input
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
            {...(register("stock"), { valueAsNumber: true })}
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
          {errors.stock && (
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
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50 cursor-pointer"
        >
          Add Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
