import c from "./errorFallback.module.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className={c.errorContainer}>
      <div className={c.errorWrapper}>
        <div className={c.something}>
          <h2>Something went wrong</h2>
          <ErrorOutlineIcon sx={{ color: "red", fontSize: "48px" }} />
        </div>

        <p>
          <strong>Error:</strong> {error.message}
        </p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
}
