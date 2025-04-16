import { AddQuestion } from "@/types/addQuestion";
import { useState } from "react";
import { InputField } from "../InputField/InputField";
import c from "./questionForm.module.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { QuestionTypeEnum } from "@/enums/QuestionTypeEnum";

type QuestionFormProps = {
  questions: AddQuestion[] | null;
  setQuestions: React.Dispatch<React.SetStateAction<AddQuestion[] | null>>;
};

export const QuestionForm = ({
  questions,
  setQuestions,
}: QuestionFormProps) => {
  const [question, setQuestion] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [options, setOptions] = useState<string[] | null>(null);
  const [answer, setAnswer] = useState<string>("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    console.log(type);
  };

  const handleSubmit = () => {
    if (!questions) {
      return;
    }
  };

  const renderType = () => {
    switch (type) {
      case "MULTIPLE_CHOICE":
        return (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            className={c.addOption}
          >
            Add Options
          </Button>
        );

      default:
        return <p>Unsupported question type.</p>;
    }
  };

  return (
    <div onClick={handleSubmit} className={`addForm ${c.questionForm}`}>
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
    </div>
  );
};
