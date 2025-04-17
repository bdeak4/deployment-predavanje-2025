import c from "./adminPage.module.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { paths } from "@/router/paths";

export const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="headerPadding container">
      <p>Admin Page</p>
      <div className={c.buttonGroup}>
        <button onClick={() => navigate(paths.createQuiz)}>Add Quiz</button>
        <button onClick={() => navigate(paths.createCategory)}>
          Add Category
        </button>
      </div>

      <Toaster />
    </div>
  );
};
