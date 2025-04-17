import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import "./index.css";
import { AuthProvider } from "./contexts";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error";
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
