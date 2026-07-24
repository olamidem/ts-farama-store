import { Search } from "lucide-react";

const HeaderSearch = () => {
  return (
    <div className="hidden md:flex items-center w-72 rounded-xl border border-slate-200 bg-white px-3 py-2">
      <Search
        size={16}
        className="text-slate-400"
      />

      <input
        type="text"
        placeholder="Search..."
        disabled
        className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default HeaderSearch;