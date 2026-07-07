import type { LabelHTMLAttributes } from "react";

const Label = ({
  children,
  className = "",
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={`
        mb-2
        block
        text-sm
        font-medium
        text-gray-700
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
