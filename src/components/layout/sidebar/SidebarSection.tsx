import SidebarItem from "./SidebarItem";
import type { NavigationItem } from "./navigation.types";

interface SidebarSectionProps {
  title: string;
  items: NavigationItem[];
}

const SidebarSection = ({ title, items }: SidebarSectionProps) => {
  return (
    <div className="space-y-1" >
      <h2 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h2>

      <div>
        {items.map((item) => (
          <SidebarItem
            key={item.to}
            label={item.label}
            to={item.to}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
