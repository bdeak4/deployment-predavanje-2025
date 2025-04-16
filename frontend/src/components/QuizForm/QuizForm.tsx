import { useState } from "react";
import { InputField } from "../InputField/InputField";
import useFetch from "@/hooks/useFetch";
import { Category } from "@/types/Category";
import { fetchAllCategories } from "@/services/categoryService";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import toast, { Toaster } from "react-hot-toast";
import c from "./quizForm.module.css";
import { AddButton } from "../AddButton/AddButton";
import { AddQuestion } from "@/types/addQuestion";
import { QuestionForm } from "../QuestionForm/QuestionForm";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type QuizFormProps = {
  setShowQuizForm: React.Dispatch<React.SetStateAction<boolean>>;
};
export const QuizForm = ({ setShowQuizForm }: QuizFormProps) => {
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [quizName, setQuizName] = useState<string>("");
  const [questions, setQuestions] = useState<AddQuestion[] | null>(null);
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");

  const { data: categories } = useFetch<Category[]>(fetchAllCategories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Choose category");
      return;
    }
    toast.success("Successfully added quiz");
    setShowQuizForm(false);
    setError("");
  };
  return (
    <form onSubmit={handleSubmit} className="addForm">
      <InputField
        label="Quiz name"
        type="text"
        placeholder="Enter quiz name"
        onChange={setQuizName}
        value={quizName}
      />
      {categories && (
        <CategoryFilter
          label="Choose category"
          categories={categories}
          setCategory={setCategoryId}
        />
      )}

      <div className={c.questionSection}>
        {!showQuestionForm ? (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => setShowQuestionForm(true)}
            className={c.addQuestion}
          >
            Add Question
          </Button>
        ) : (
          <QuestionForm questions={questions} setQuestions={setQuestions} />
        )}
      </div>

      {error && <div className="errorMessage">{error}</div>}

      <AddButton />
      <Toaster />
    </form>
  );
};
