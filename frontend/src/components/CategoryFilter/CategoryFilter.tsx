import { Category } from "@/types/Category";
import React from "react";
import c from "./categoryFilter.module.css";

type CategoryFilterProps = {
  label: string;
  categories: Category[];
  setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CategoryFilter = ({
  label,
  categories,
  setCategory,
}: CategoryFilterProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className={c.categoryFilter}>
      <label className={c.label}>{label} </label>
      <select className={c.select} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
