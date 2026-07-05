import { Lock, LogIn, Phone } from "lucide-react";
const LoginForm = () => {
  return (
    <div>
      <form className="space-y-5">
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
            Staff Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              required
              placeholder="Phone number"
              className="w-full py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              placeholder="••••"
              className="w-full py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
        >
          <LogIn className="w-4 h-4" />

          <span>Sign In</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
