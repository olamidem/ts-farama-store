import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";

interface ImportStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  {
    number: 1,
    title: "Upload",
  },
  {
    number: 2,
    title: "Validate",
  },
  {
    number: 3,
    title: "Import",
  },
];

const ImportSteps = ({ currentStep }: ImportStepsProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const completed = step.number < currentStep;
        const active = step.number === currentStep;

        return (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all",
                  completed && "border-emerald-500 bg-emerald-500 text-white",
                  active && "border-blue-600 bg-blue-600 text-white",
                  !completed &&
                    !active &&
                    "border-slate-300 bg-white text-slate-400",
                )}
              >
                {completed ? <Check size={18} /> : step.number}
              </div>

              <span
                className={cn(
                  "text-sm font-semibold",
                  active && "text-blue-700",
                  completed && "text-emerald-700",
                  !completed && !active && "text-slate-400",
                )}
              >
                {step.title}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-[2px] flex-1 rounded-full",
                  completed ? "bg-emerald-500" : "bg-slate-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImportSteps;
