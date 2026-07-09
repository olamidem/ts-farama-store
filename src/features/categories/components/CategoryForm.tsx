import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
import {
  createCategorySchema,
  type CategoryFormData,
} from "../validation/category.schema";

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
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    },
    // defaultValues: {
    //   name: "",
    //   description: "",
    //   ...defaultValues,
    // },
  });

  return (
    <form
      onSubmit={handleSubmit((data: CategoryFormData) => onSubmit(data))}
      className="space-y-5"
    >
      <div>
        <Label>Category Name *</Label>
        <Input placeholder="e.g. Beverages" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
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
