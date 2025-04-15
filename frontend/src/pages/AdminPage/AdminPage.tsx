import { useState } from "react";
import c from "./adminPage.module.css";
import { CategoryForm } from "@/components";
import { Toaster } from "react-hot-toast";

export const AdminPage = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <div className="headerPadding container">
      <p>Admin Page</p>
      <div className={c.buttonGroup}>
        <button onClick={() => console.log("Add Quiz clicked")}>
          Add Quiz
        </button>
        <button onClick={() => setShowCategoryForm((prev) => !prev)}>
          {showCategoryForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showCategoryForm && (
        <CategoryForm setShowCategoryForm={setShowCategoryForm} />
      )}
      <Toaster />
    </div>
  );
};
