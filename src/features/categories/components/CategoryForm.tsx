import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import {
  createCategorySchema,
  type CategoryFormData,
} from "../validation/category.schema";
import { useEffect, useRef } from "react";
import { generateSkuPrefix } from "../../../utils/generateSkuPrefix";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormData>;
  loading?: boolean;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void> | void;
}

const CategoryForm = ({
  defaultValues,
  loading = false,
  submitLabel = "Create Category",
  onCancel,
  onSubmit,
}: CategoryFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      sku_prefix: defaultValues?.sku_prefix ?? "",
      description: defaultValues?.description ?? "",
    },
    // defaultValues: {
    //   name: "",
    //   description: "",
    //   ...defaultValues,
    // },
  });

  const categoryName = useWatch({
    control,
    name: "name",
  });
  const skuEdited = useRef((defaultValues?.sku_prefix?.length ?? 0) > 0);
  const skuPrefixField = register("sku_prefix");
  useEffect(() => {
    if (skuEdited.current) {
      return;
    }
    setValue("sku_prefix", generateSkuPrefix(categoryName), {
      shouldValidate: true,
    });
  }, [categoryName, setValue]);
  return (
    <form
      onSubmit={handleSubmit((data: CategoryFormData) => onSubmit(data))}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label>Category Name *</Label>
          <Input placeholder="e.g. Beverages" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>SKU Prefix *</Label>
          <Input
            placeholder="BEV"
            maxLength={5}
            className="uppercase"
            {...skuPrefixField}
            onChange={(event) => {
              skuEdited.current = true;
              skuPrefixField.onChange(event);
            }}
          />
          {errors.sku_prefix && (
            <p className="mt-1 text-xs text-red-500">
              {errors.sku_prefix.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Input
          placeholder="Optional description..."
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-3 border-t border-slate-200">
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading} fullWidth>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
