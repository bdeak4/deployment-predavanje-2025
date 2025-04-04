import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import "./index.css";
import { AuthProvider } from "./contexts";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
