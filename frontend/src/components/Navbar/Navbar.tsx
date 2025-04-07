import c from "./navbar.module.css";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const [searchParam, setSearchParam] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchParam.trim()) {
      navigate(`/?search=${searchParam}`);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  return (
    <nav className={c.navigation}>
      <div className={c.logo}>
        <h3>Dump Quiz</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchParam}
          onChange={handleChange}
          placeholder="Search quizzes"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </nav>
  );
};
