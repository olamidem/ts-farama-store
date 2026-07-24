import { Menu } from "lucide-react";
import HeaderSearch from "./HeaderSearch";
import UserDropdown from "./UserDropdown";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="flex h-18 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">

        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu size={18} />
          </button>
        )}

        <HeaderTitle />

      </div>

      <div className="flex items-center gap-5">

        <HeaderSearch />

        <HeaderNotifications />

        <UserDropdown />

      </div>

    </header>
  );
};

export default Header;