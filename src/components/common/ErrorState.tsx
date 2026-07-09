import { AlertTriangle } from "lucide-react";
import Button from "../ui/Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-900">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;