const Logo = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
  const isDark = theme === "dark";
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      <div className="relative">
        {/* Ambient background glow on hover */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur-xs opacity-45 group-hover:opacity-90 transition duration-300"></div>
        {/* Hexagonal/Rounded-Square Logo Badge */}
        <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-slate-900 via-slate-950 to-blue-950 flex items-center justify-center border border-white/10 shadow-md text-white font-black text-xs tracking-wider">
          FM
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span
          className={`font-black text-sm tracking-widest leading-none transition-colors ${
            isDark
              ? "text-white group-hover:text-blue-400"
              : "text-slate-900 group-hover:text-blue-600"
          }`}
        >
          FARAMA POS
        </span>
        <span
          className={`text-[9px] font-extrabold tracking-wider uppercase mt-1 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Smart Business Suite
        </span>
      </div>
    </div>
  );
};

export default Logo;
