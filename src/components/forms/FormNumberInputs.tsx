import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import Input from "../ui/Input";
import Label from "../ui/Label";

interface FormNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const FormNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  min,
  max,
  step,
  className,
}: FormNumberInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <Label className="block text-[10px] font-bold uppercase text-slate-400">
            {label}
          </Label>

          <Input
            type="number"
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            onBlur={field.onBlur}
            ref={field.ref}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
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

export default FormNumberInput;
