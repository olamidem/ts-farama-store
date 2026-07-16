import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import Label from "../ui/Label";
import Select from "../ui/Select";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
  className,
}: FormSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <Label className="block text-[10px] font-bold uppercase text-slate-400">
            {label}
          </Label>

          <Select
            options={options}
            value={field.value ?? ""}
            onChange={field.onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={className}
          />

          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FormSelect;
