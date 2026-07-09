import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    const resolvedRef = (ref ??
      internalRef) as React.RefObject<HTMLInputElement>;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          ref={resolvedRef}
          type="checkbox"
          className={cn(
            "peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white transition",
            "checked:border-blue-600 checked:bg-blue-600",
            "focus:ring-2 focus:ring-blue-200",
            className,
          )}
          {...props}
        />
        <Check
          size={12}
          className="pointer-events-none absolute left-0.5 top-0.5 hidden text-white peer-checked:block"
        />
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
