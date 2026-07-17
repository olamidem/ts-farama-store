import type { ReactNode } from "react";

interface FormHeaderProps {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

const FormHeader = ({ title, icon, actions }: FormHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-blue-50 pb-2.5">
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
        {icon}
        {title}
      </h4>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default FormHeader;
