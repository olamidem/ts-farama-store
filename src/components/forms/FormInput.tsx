import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type {
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { cn } from "../../utils/cn";

interface FormInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  icon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  className,
  icon,
  prefix,
  suffix
   
}: FormInputProps<T>) => {
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
    {...field}
    value={field.value ?? ""}
    type={type}
    placeholder={placeholder}
    disabled={disabled}
    className={`
      ${prefix ? "pl-9" : ""}
      ${(suffix || icon) ? "pr-9" : ""}
      ${className ?? ""}
    `}
  />

  {suffix && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
      {suffix}
    </div>
  )}

  {!suffix && icon && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
      {icon}
    </div>
  )}
</div>

          {fieldState.error && (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormInput;