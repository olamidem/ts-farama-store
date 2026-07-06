import Logo from "../branding/Logo";
import { navigation } from "./Navigation";
import SidebarSection from "./SidebarSection";  


const Sidebar = () => {
  return (
    <aside className="hidden h-screen w-72 border-r border-slate-100 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-slate-100 p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto p-6">
        {navigation.map((section) => (
          <SidebarSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
