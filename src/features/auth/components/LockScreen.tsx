import { useState } from "react";
import { Lock, LogOut, Delete } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import useAuthStore from "../store/authStore";

export const LockScreen = () => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const setLocked = useAuthStore((state) => state.setLocked);
  const logout = useAuthStore((state) => state.logout);

  const [pin, setPin] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  const handleUnlock = async () => {
    if (!user) return;
    setIsVerifying(true);
    try {
      const isValid = await unlockWithPin(user.id, pin);
      if (isValid) {
        setLocked(false);
        toast.success("Welcome back, screen unlocked!");
      } else {
        setErrorCount((prev) => prev + 1);
        setShakeTrigger(true);
        setTimeout(() => setShakeTrigger(false), 500);
        setPin("");
        toast.error("Incorrect PIN. Please try again.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unlock failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Automated submit if length is 4 or 6 (common standard PIN lengths)
  const handleSubmitPin = () => {
    if (pin.length >= 4) {
      handleUnlock();
    } else {
      toast.error("PIN must be at least 4 digits.");
    }
  };

  const handleSwitchAccount = async () => {
    await logout();
    toast.info("Switched accounts. Please sign in.");
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || "OP";
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-900 text-white p-4 font-sans select-none overflow-y-auto">
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent)] pointer-events-none" />

      {/* Main Lock container */}
      <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8 z-10">
        {/* Profile Card Info Header */}
        <div className="flex flex-col items-center space-y-3.5 text-center">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || "Staff Avatar"}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full border-4 border-indigo-500/20 object-cover shadow-xl"
              />
            ) : (
              <div
                style={{ backgroundColor: profile?.avatar_color || "#4f46e5" }}
                className="w-20 h-20 rounded-full border-4 border-indigo-500/20 shadow-xl flex items-center justify-center text-xl font-bold tracking-wider"
              >
                {getInitials()}
              </div>
            )}

            <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1.5 rounded-full border-2 border-slate-900 shadow-md">
              <Lock size={12} className="text-white" />
            </div>
          </div>

          <div className="space-y-0.5">
            <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
              {profile?.full_name || "POS Operator"}
            </h2>
            <p className="text-xs font-semibold text-indigo-400">
              {profile?.role?.name || "Terminal Access Locked"}
            </p>
          </div>
        </div>

        {/* PIN Entry Dot Matrix with shake animation */}
        <motion.div
          animate={shakeTrigger ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Masked Dots */}
          <div className="flex items-center gap-4 justify-center h-8">
            {[...Array(6)].map((_, i) => {
              const active = i < pin.length;
              return (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                    active
                      ? "bg-indigo-400 border-indigo-400 shadow-lg shadow-indigo-500/40 scale-110"
                      : "border-slate-700 bg-slate-800"
                  }`}
                />
              );
            })}
          </div>

          {/* Feedback Label */}
          {errorCount > 0 && !shakeTrigger && (
            <p className="text-xs text-rose-400 font-bold tracking-wide">
              Wrong PIN. Try again.
            </p>
          )}
        </motion.div>

        {/* Custom Numeric Grid pad */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full max-w-[280px]">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-16 w-16 mx-auto rounded-full bg-slate-800/60 hover:bg-slate-800 text-lg font-bold border border-slate-800 hover:border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-sm"
            >
              {num}
            </button>
          ))}

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="h-16 w-16 mx-auto rounded-full bg-transparent text-xs text-slate-400 hover:text-slate-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center font-bold"
          >
            Clear
          </button>

          {/* Zero Button */}
          <button
            onClick={() => handleKeyPress("0")}
            className="h-16 w-16 mx-auto rounded-full bg-slate-800/60 hover:bg-slate-800 text-lg font-bold border border-slate-800 hover:border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            0
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="h-16 w-16 mx-auto rounded-full bg-transparent text-slate-400 hover:text-slate-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center font-bold"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Bottom Actions Form */}
        <div className="flex flex-col space-y-3 w-full max-w-[260px] pt-2">
          <button
            disabled={pin.length < 4 || isVerifying}
            onClick={handleSubmitPin}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <span>Unlock Session</span>
            )}
          </button>

          <button
            onClick={handleSwitchAccount}
            className="w-full py-3 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 font-bold text-xs uppercase tracking-widest rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut size={13} />
            <span>Switch Operator</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
