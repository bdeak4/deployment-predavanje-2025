import c from "./login.module.css";
import { Link } from "react-router";

export const Login = () => {
  const loading = false;
  return (
    <div className={c.loginContainer}>
      <h1>Welcome to DUMP Quiz</h1>
      <div className={c.loginWrapper}>
        <form className={c.form}>
          <h2 className={c.title}>Log in</h2>

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
