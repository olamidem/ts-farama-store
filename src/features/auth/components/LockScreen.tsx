import {  LogOut } from "lucide-react";
import { motion } from "motion/react";
import useAuthStore from "../store/authStore";
import useLockScreen from "../hooks/useLockScreenController";
import NumberPad from "./NumberPad";
import UserAvatar from "./USerAvatar";


const LockScreen = () => {
  const profile = useAuthStore((state) => state.profile);

  const {
    pin,
    pinLength,
    isVerifying,
    errorCount,
    shakeTrigger,
    appendDigit,
    deleteDigit,
    clearPin,
    unlock,
    switchAccount,
  } = useLockScreen();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81_0%,transparent_40%)] opacity-60" />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <UserAvatar profile={profile} />
          <div>
            <h2 className="text-xl font-bold">
              {profile?.full_name ?? "POS Operator"}
            </h2>
            <p className="text-xs text-indigo-400 font-semibold">
              {profile?.role?.name ?? "Terminal Locked"}
            </p>
          </div>
        </div>

        <motion.div
          animate={shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex gap-4">
            {Array.from({ length: pinLength }).map((_, index) => (
              <div
                key={index}
                className={`h-3.5 w-3.5 rounded-full transition-all ${
                  index < pin.length
                    ? "bg-indigo-400 shadow-lg shadow-indigo-500/50"
                    : "border border-slate-700 bg-slate-800"
                }`}
              />
            ))}
          </div>

          {errorCount > 0 && !shakeTrigger && (
            <p className="text-xs text-rose-400 font-bold">
              Wrong PIN. Try again.
            </p>
          )}
        </motion.div>

        <NumberPad
          onDigit={appendDigit}
          onDelete={deleteDigit}
          onClear={clearPin}
        />

        <div className="flex w-full max-w-65 flex-col gap-3">

          <button
            disabled={pin.length < pinLength || isVerifying}
            onClick={unlock}
            className="rounded-2xl bg-indigo-600 py-3 font-bold uppercase tracking-wider hover:bg-indigo-500 disabled:opacity-40"
          >
            {isVerifying ? "Checking..." : "Unlock Session"}
          </button>

          <button
            onClick={switchAccount}
            className="flex items-center justify-center gap-2 rounded-2xl py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={14} />
            Switch Operator
          </button>

        </div>

      </div>
    </div>
  );
};

export default LockScreen;