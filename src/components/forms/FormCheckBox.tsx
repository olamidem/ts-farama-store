import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Label from "../ui/Label";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  disabled?: boolean;
}

const FormCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <div className="space-y-0.5">
            <Label className="text-sm font-medium cursor-pointer">
              {label}
            </Label>

            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FormCheckbox;
