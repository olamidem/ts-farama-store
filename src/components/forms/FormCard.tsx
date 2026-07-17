import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FormCardProps {
  children: ReactNode;
  className?: string;
}

const FormCard = ({ children, className }: FormCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-100 bg-blue-50/20 p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormCard;
