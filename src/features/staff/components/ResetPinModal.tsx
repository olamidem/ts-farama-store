import { useEffect, useState } from "react";
import type { Employee } from "../types/staff";

interface ResetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onSubmit: (id: string, pin: string) => void;
  isLoading?: boolean;
}

export const ResetPinModal = ({
  isOpen,
  onClose,
  employee,
  onSubmit,
  isLoading = false,
}: ResetPinModalProps) => {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPin("");
    }
  }, [isOpen, employee]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  const isValidPin = pin.length >= 4 && pin.length <= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPin || isLoading) return;

    onSubmit(employee.id, pin.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Reset Staff PIN
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a new login PIN for this staff member.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Staff Member
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {employee.full_name}
            </p>

            <p className="text-sm text-slate-500">{employee.role?.name}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              New PIN
            </label>

            <input
              autoFocus
              required
              type="password"
              maxLength={6}
              value={pin}
              placeholder="Enter 4–6 digit PIN"
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setPin(e.target.value);
                }
              }}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center font-mono text-lg tracking-[0.35em] outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <p className="text-xs text-slate-500">
              PIN must contain only numbers (4–6 digits).
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValidPin || isLoading}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition
                ${
                  isValidPin && !isLoading
                    ? "bg-slate-900 hover:bg-slate-800"
                    : "cursor-not-allowed bg-slate-300"
                }`}
            >
              {isLoading ? "Updating..." : "Reset PIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
