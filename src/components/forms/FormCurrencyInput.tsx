import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Label from "../ui/Label";
import Input from "../ui/Input";

interface FormCurrencyInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  currencySymbol?: string;
}

const FormCurrencyInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  currencySymbol = "₦",
}: FormCurrencyInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <Label className="block text-[10px] font-bold uppercase text-slate-400">
            {label}
          </Label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
              {currencySymbol}
            </span>

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
              className="pl-7 font-mono"
            />
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FormCurrencyInput;
