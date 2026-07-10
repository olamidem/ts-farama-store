import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variants = {
  default: "bg-gray-200 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-blue-100 text-blue-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-semibold",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
