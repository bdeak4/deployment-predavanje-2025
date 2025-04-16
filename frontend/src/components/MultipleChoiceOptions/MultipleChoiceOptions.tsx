import { Button } from "@mui/material";
import c from "./multiple.module.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputField } from "../InputField/InputField";
import { useState } from "react";
import toast from "react-hot-toast";

type MultipleChoiceOptionsProps = {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
};

export const MultipleChoiceOptions = ({
  options,
  setOptions,
  answer,
  setAnswer,
}: MultipleChoiceOptionsProps) => {
  const [newOption, setNewOption] = useState<string>("");

  const handleAddOption = () => {
    if (!newOption.trim()) {
      toast.error("Option can't be empty");
      return;
    }

    if (options.includes(newOption.trim())) {
      toast.error("Option must be unique.");
      return;
    }

    setOptions((prev) => [...prev, newOption.trim()]);
    setNewOption("");
  };

  const handleRemoveOption = (option: string) => {
    setOptions((prev) => prev.filter((o) => o !== option));
    if (option === answer) setAnswer("");
  };

  return (
    <div className={c.wrapper}>
      <div className={c.addOptionRow}>
        <InputField
          label="New option"
          type="text"
          placeholder="Enter option"
          value={newOption}
          onChange={setNewOption}
        />
        <Button onClick={handleAddOption} variant="contained">
          Add option
        </Button>
      </div>

      {options.length > 0 && (
        <div className={c.optionsList}>
          <h5>Current Options: </h5>
          {options.map((opt) => (
            <div key={opt} className={c.optionItem}>
              <span>{opt}</span>
              <div className={c.optionActions}>
                <Button
                  onClick={() => setAnswer(opt)}
                  variant={opt === answer ? "contained" : "outlined"}
                  color="success"
                  size="small"
                  className={c.actionBtn}
                >
                  <CheckIcon fontSize="small" />
                </Button>
                <Button
                  onClick={() => handleRemoveOption(opt)}
                  variant="outlined"
                  color="error"
                  size="small"
                  className={c.actionBtn}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
