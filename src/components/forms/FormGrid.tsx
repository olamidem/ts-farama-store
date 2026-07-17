import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FormGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

const gridColumns = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-4",
};

const FormGrid = ({ children, cols = 2, className }: FormGridProps) => {
  return (
    <div className={cn("grid gap-4", gridColumns[cols], className)}>
      {children}
    </div>
  );
};

export default FormGrid;
