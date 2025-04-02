import { useState } from "react";
import c from "./login.module.css";
import { Link, useNavigate } from "react-router";
import { login } from "@/services/AuthService/authService";
import { paths } from "@/router/paths";

export const Login = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(prompt, password);

      console.log("Login successful:", data);

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

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

          {error && <div className={c.errorMessage}>{error}</div>}

          <div className={c.formGroup}>
            <label htmlFor="username" className={c.label}>
              Username or email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={c.input}
              placeholder="Enter email or username"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              required
            />
          </div>

          <div className={c.formGroup}>
            <label htmlFor="password" className={c.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={c.input}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className={c.button} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

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
