import { InputField } from "@/components";
import { SubmitBtn } from "@/components/SubmitButton/SubmitBtn";
import c from "@/pages/Auth/Register/register.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "@/services/authService";
import toast from "react-hot-toast";
import { paths } from "@/router/paths";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.length < 3) {
      setError("Username must have at least 3 characters");
      return false;
    }
    if (password.length < 5) {
      setError("Password must have at least 5 characters");
      return false;
    }
    if (password !== repeatPassword) {
      setError("Your re-entered password doesn't match");
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
      await register(username, email, password);

      toast.success(
        "Successfully created account, now log in with your credentials."
      );
      navigate(paths.login);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError("Username or email already exists.");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={c.registerContainer}>
      <h1>Register to DUMP Quiz</h1>
      <div className={c.registerWrapper}>
        <form className={c.form} onSubmit={handleSubmit}>
          <h2 className={c.title}>Register</h2>

          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username"
            onChange={setUsername}
            value={username}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your username"
            onChange={setEmail}
            value={email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={setPassword}
            value={password}
          />
          <InputField
            label="Re-enter password"
            type="password"
            placeholder="Re-enter password"
            onChange={setRepeatPassword}
            value={repeatPassword}
          />

          {error && <div className={c.errorMessage}>{error}</div>}

          <SubmitBtn
            text="Sign in"
            loadingText="Signing in..."
            loading={loading}
          />

          <div className={c.login}>
            You already have an account?
            <Link to="/login" className={c.loginLink}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
