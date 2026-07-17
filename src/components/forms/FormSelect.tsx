import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { ReactNode } from "react";
import Label from "../ui/Label";
import Select from "../ui/Select";
import { cn } from "../../utils/cn";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
  className,
  inputClassName,
  leftElement,
  rightElement,
}: FormSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-1", className)}>
          <Label>{label}</Label>

          <div className="relative">
            {leftElement && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                {leftElement}
              </div>
            )}

            <Select
              options={options}
              value={field.value ?? ""}
              onChange={field.onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                leftElement && "pl-8",
                rightElement && "pr-8",
                inputClassName,
              )}
            />

            {rightElement && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 pointer-events-none">
                {rightElement}
              </div>
            )}
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FormSelect;
