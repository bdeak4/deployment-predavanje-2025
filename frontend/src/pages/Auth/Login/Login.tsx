import { useState } from "react";
import c from "./login.module.css";
import { Link, useNavigate } from "react-router";
import { login } from "@/services/AuthService/authService";
import { paths } from "@/router/paths";
import { InputField } from "@/components";
import { SubmitBtn } from "@/components/SubmitButton/SubmitBtn";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    if (prompt.length < 3) {
      setError("Username must have at least 3 characters");
      return false;
    }
    if (password.length < 5) {
      setError("Password must have at least 5 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = validateInputs();

    if (!errorMessage) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await login(prompt, password);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      toast.success("Successfully logged in");
      navigate(paths.quizzes);
    } catch (err: any) {
      setError("Invalid credentials, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={c.loginContainer}>
      <h1>Welcome to DUMP Quiz</h1>
      <div className={c.loginWrapper}>
        <form className={c.form} onSubmit={handleSubmit}>
          <h2 className={c.title}>Log in</h2>

          <InputField
            label="Username or email"
            type="text"
            placeholder="Enter username or mail"
            onChange={setPrompt}
            value={prompt}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={setPassword}
            value={password}
          />

          {error && <div className={c.errorMessage}>{error}</div>}

          <SubmitBtn
            text="Log in"
            loadingText="Logging in..."
            loading={loading}
          />

          <Toaster />

          <div className={c.register}>
            You don't have an account?
            <Link to="/register" className={c.registerLink}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
