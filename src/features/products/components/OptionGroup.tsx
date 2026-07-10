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
  value,
  options,
  onChange,
}: OptionGroupProps<T>) => {
  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl border px-4 py-4 text-center transition-all duration-200",
              value === option.value
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            <span
              className={cn(
                "font-medium",
                value === option.value ? "text-blue-700" : "text-slate-700",
              )}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionGroup;
