import { Package2 } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
        <Package2 className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Farama Store
        </h1>
        <p className="text-xs text-slate-500">Inventory Management System</p>
      </div>
    </div>
  );
};

export default Logo;

//  <div className="flex items-center gap-3 group cursor-pointer select-none">
//           <div className="relative">
//             {/* Ambient background glow on hover */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-xs opacity-45 group-hover:opacity-90 transition duration-300"></div>
//             {/* Hexagonal/Rounded-Square Logo Badge */}
//             <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 flex items-center justify-center border border-white/10 shadow-md text-white font-black text-xs tracking-wider">
//               FM
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-black text-sm tracking-widest text-slate-900 leading-none group-hover:text-blue-600 transition-colors">FARAMA</span>
//             <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mt-1">STORE</span>
//           </div>
//         </div>