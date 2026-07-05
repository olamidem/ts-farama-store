
import bgImage from "../../assets/this.png";
import LoginForm from "../features/auth/components/loginForm";


const LoginScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans overflow-hidden">
      {/* LEFT PANE: LOGIN FORM */}
      <div className="w-full md:w-[45%] bg-white flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12 relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
          {/* Logo Brand Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-30"></div>
                <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-slate-900 via-slate-950 to-blue-950 flex items-center justify-center border border-white/10 shadow-lg text-white font-black text-lg tracking-wider">
                  FM
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">
                  FARAMA STORE
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Login to have access to your dashboard
            </p>
          </div>

          {/* Login Form */}
         <LoginForm />

          {/* Footer branding */}
          <div className="border-t border-slate-100 pt-6 text-center text-slate-400 text-[11px] font-medium">
            <p>© 2026 Farama Store. All Rights Reserved.</p>
            <p className="mt-0.5">Authorized Store Personnel Only.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: BEAUTIFUL GROCERY BANNER SPLIT */}
      <div className="hidden md:block md:w-[55%] relative overflow-hidden bg-slate-900">
        {/* Sleek diagonal white split panel overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-white transform -skew-x-6 -translate-x-8 z-10" />

        <img
          src={bgImage}
          alt="Farama Store Grocery"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85 select-none"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
