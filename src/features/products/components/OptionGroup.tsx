import { cn } from "../../../utils/cn";

interface Option<T extends string> {
  label: string;
  value: T;
}

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}

const OptionGroup = <T extends string>({
  label,
  value,
  options,
  onChange,
}: OptionGroupProps<T>) => {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center justify-between rounded-lg border px-4 py-3 transition-all",
              value === option.value
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 hover:border-slate-300",
            )}
          >
            <span className="font-medium text-slate-700">{option.label}</span>
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2",
                value === option.value
                  ? "border-blue-600 bg-blue-600"
                  : "border-slate-300",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionGroup;
