import { useState } from "react";
import { InputField } from "../InputField/InputField";
import c from "./categoryForm.module.css";
import toast from "react-hot-toast";
import { createCategory } from "@/services/categoryService";
import { AddButton } from "../AddButton/AddButton";

export const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim().length < 3) {
      setError("Category name must be at least 3 characters long.");
      return;
    }

    try {
      await createCategory(categoryName.trim());
      toast.success("Successfully added category!");
      setCategoryName("");
      setError("");
    } catch (err) {
      setError("Category with that name already exists.");
    }
  };

  return (
    <div className="container headerPadding">
      <h1 className={c.formHeading}>Creating new Category</h1>
      <form onSubmit={handleCategorySubmit} className="addForm">
        <InputField
          label="Category name:"
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={setCategoryName}
        />
        {error && <div className="errorMessage">{error}</div>}

        <AddButton />
      </form>
    </div>
  );
};
