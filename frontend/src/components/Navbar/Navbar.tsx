import c from "./navbar.module.css";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <nav className={c.navigation}>
      <div className={c.logo}>
        <h3>Dump Quiz</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search quizzes"
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};
