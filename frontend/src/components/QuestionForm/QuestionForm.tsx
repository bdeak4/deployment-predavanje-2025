import { AddQuestion } from "@/types/addQuestion";
import { useState } from "react";
import { InputField } from "../InputField/InputField";
import c from "./questionForm.module.css";
import { QuestionTypeEnum } from "@/enums/QuestionTypeEnum";
import { MultipleChoiceOptions } from "../MultipleChoiceOptions/MultipleChoiceOptions";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { QuestionType } from "@/types/QuestionType";

type QuestionFormProps = {
  questions: AddQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<AddQuestion[]>>;
  setShowQuestionForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuestionForm = ({
  questions,
  setQuestions,
  setShowQuestionForm,
}: QuestionFormProps) => {
  const [question, setQuestion] = useState<string>("");
  const [type, setType] = useState<QuestionType>("MULTIPLE_CHOICE");
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    setType(newType);

    if (newType === "MULTIPLE_CHOICE") {
      setOptions([]);
      setAnswer("");
    } else if (newType === "TRUE_FALSE") {
      setOptions(["True", "False"]);
      setAnswer("");
    } else if (newType === "SHORT_ANSWER") {
      setOptions([]);
      setAnswer("");
    }
  };

  const handleAddQuestion = () => {
    if (question.length < 3) {
      toast.error("Question text must have at least 3 characters");
      return;
    }

    if (questions.some((q) => q.text === question)) {
      toast.error("This question already exists.");
      return;
    }

    if (type === "MULTIPLE_CHOICE" && options.length < 3) {
      toast.error("You must have at least 3 options for multiple choice");
      return;
    }

    if (!answer) {
      toast.error("You have to choose correct answer");
      return;
    }

    if (type === "MULTIPLE_CHOICE" && !options.includes(answer)) {
      toast.error("Correct answer must be one of the options.");
      return;
    }

    if (type === "TRUE_FALSE") {
      if (answer !== "True" && answer !== "False") {
        toast.error("You must choose either True or False as the answer.");
        return;
      }
    }

    const newQuestion = {
      text: question,
      type: type,
      options: options,
      answer: answer,
    } as AddQuestion;

    setQuestions((prev) => (prev ? [...prev, newQuestion] : [newQuestion]));

    setQuestion("");
    setOptions([]);
    setAnswer("");
    setShowQuestionForm(false);
  };

  const renderType = () => {
    switch (type) {
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceOptions
            answer={answer}
            setAnswer={setAnswer}
            options={options}
            setOptions={setOptions}
          />
        );
      case "TRUE_FALSE":
        return (
          <div className={c.trueFalseWrapper}>
            <p className={c.label}>Choose correct answer:</p>
            <div className={c.trueFalseButtons}>
              <Button
                variant={answer === "True" ? "contained" : "outlined"}
                onClick={() => setAnswer("True")}
              >
                True
              </Button>
              <Button
                variant={answer === "False" ? "contained" : "outlined"}
                onClick={() => setAnswer("False")}
              >
                False
              </Button>
            </div>
          </div>
        );
      case "SHORT_ANSWER":
        return (
          <div className={c.shortAnswerWrapper}>
            <InputField
              label="Correct short answer"
              type="text"
              placeholder="Enter correct answer"
              value={answer}
              onChange={setAnswer}
            />
          </div>
        );

      default:
        return <p>Unsupported question type.</p>;
    }
  };

  return (
    <div className={`addForm ${c.questionForm}`}>
      <h4>Adding questions to quiz</h4>
      <InputField
        label="Question text"
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={setQuestion}
      />
      <label className={c.label}>Question type</label>
      <select onChange={handleTypeChange} className={c.select}>
        {Object.entries(QuestionTypeEnum).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div className={c.types}>{renderType()}</div>
      <Button variant="outlined" sx={{ mt: 1 }} onClick={handleAddQuestion}>
        Add Question
      </Button>
    </div>
  );
};
