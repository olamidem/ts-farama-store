import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { ReactNode } from "react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { cn } from "../../utils/cn";

interface FormNumberInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
  prefix,
  suffix,
}: FormNumberInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-1", className)}>
          <Label>{label}</Label>

          <div className="relative">
            {prefix && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                {prefix}
              </div>
            )}

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
              className={`
      ${prefix ? "pl-8" : ""}
      ${suffix ? "pr-10" : ""}
      ${className ?? ""}
    `}
            />

            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                {suffix}
              </span>
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

export default FormNumberInput;
