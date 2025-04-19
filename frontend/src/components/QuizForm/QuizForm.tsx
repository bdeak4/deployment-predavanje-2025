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
import { ClipLoader } from "react-spinners";
import { createQuiz } from "@/services/quizzesService";

export const QuizForm = () => {
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [quizName, setQuizName] = useState<string>("");
  const [questions, setQuestions] = useState<AddQuestion[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");

  const { data: categories, isLoading } =
    useFetch<Category[]>(fetchAllCategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Choose category");
      return;
    }
    if (questions.length < 5) {
      toast.error("Quiz must have at least 5 different questions");
      return;
    }

    try {
      await createQuiz({
        name: quizName,
        categoryId: categoryId,
        questions: questions,
      });

      toast.success("Successfully added quiz");
      setError("");
      setQuestions([]);
      setCategoryId("");
      setQuizName("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create quiz"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  return (
    <div className="container headerPadding">
      <h1 className={c.formHeading}>Creating new Quiz</h1>
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
          {questions && questions.length > 0 && (
            <div className={c.addedQuestions}>
              <h4>Added Questions:</h4>
              <div className={c.questionsWrapper}>
                {questions.map((question, index) => (
                  <div key={index}>
                    {index + 1}. {question.text} - answer: {question.answer}
                  </div>
                ))}
              </div>
            </div>
          )}
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
            <QuestionForm
              questions={questions}
              setQuestions={setQuestions}
              setShowQuestionForm={setShowQuestionForm}
            />
          )}
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <AddButton />
        <Toaster />
      </form>
    </div>
  );
};
