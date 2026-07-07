import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="
        w-full
        rounded-lg
        border
        border-gray-300
        px-4
        py-2
        outline-none
        transition
        focus:border-blue-500
      "
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
