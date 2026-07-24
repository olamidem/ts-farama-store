import { Menu } from "lucide-react";
import HeaderTitle from "./HeaderTitle";
import HeaderSearch from "./HeaderSearch";
import { HeaderNotification } from "./HeaderNotification";
import { UserDropdown } from "./UserDropdown";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="flex h-18 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden cursor-pointer shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <HeaderTitle />
      </div>

      <div className="flex items-center gap-5">
        <HeaderSearch />

        <HeaderNotification />

        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;