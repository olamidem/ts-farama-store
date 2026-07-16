import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { HTMLInputTypeAttribute } from "react";

import Input from "../ui/Input";
import Label from "../ui/Label";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  className,
}: FormInputProps<T>) => {
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
            {...field}
            value={field.value ?? ""}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
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

export default FormInput;
