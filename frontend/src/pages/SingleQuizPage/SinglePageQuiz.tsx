import { useParams } from "react-router";
import c from "./singleQuiz.module.css";
import useFetch from "@/hooks/useFetch";
import { Quiz } from "@/types/Quiz";
import { fetchQuizById } from "@/services/quizzesService";
import { ClipLoader } from "react-spinners";
import { useCallback, useState } from "react";
import { saveQuizResult } from "@/services/quizResultsService";

export function SinglePageQuiz() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("Something went wrong.");
  }
  const fetcher = useCallback(() => fetchQuizById(id), [id]);
  const { data, isLoading, error } = useFetch<Quiz>(fetcher);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (error) throw new Error(error || "Unknown error");

  if (!data) {
    return (
      <div className="container">
        <p>No quiz found</p>
      </div>
    );
  }

  const saveResult = async () => {
    if (!data) return;

    try {
      await saveQuizResult(id, score);
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      saveResult();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className={`headerPadding container`}>
        <div className={c.quizCompletedContainer}>
          <h2>Quiz Completed!</h2>
          <div className={c.quizStats}>
            <h3>
              Your Score: {score}/{data.questions.length * 10}
            </h3>
          </div>
          <button className={c.restartButton} onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = data.questions[currentQuestionIndex];

  const renderQuestionOptions = () => {
    switch (currentQuestion.type) {
      case "TRUE_FALSE":
        return (
          <div className={c.trueFalseContainer}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`${c.trueFalseOption} ${
                  isAnswered && selectedAnswer === option
                    ? option === currentQuestion.answer
                      ? c.correctOption
                      : c.incorrectOption
                    : ""
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        );

      case "MULTIPLE_CHOICE":
        return (
          <div className={c.multipleChoiceContainer}>
            {currentQuestion.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index);
              return (
                <div
                  key={index}
                  className={`${c.optionItem} ${
                    isAnswered && selectedAnswer === option
                      ? option === currentQuestion.answer
                        ? c.correctOption
                        : c.incorrectOption
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span className={c.optionLabel}>{optionLabel}</span>
                  <span className={c.optionText}>{option}</span>
                </div>
              );
            })}
          </div>
        );

      case "SHORT_ANSWER":
        return (
          <div className={c.shortAnswerContainer}>
            <input
              type="text"
              placeholder="Type your answer..."
              className={c.shortAnswerInput}
              value={selectedAnswer || ""}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={isAnswered}
            />
            {!isAnswered && (
              <button
                className={c.submitButton}
                onClick={() => handleAnswerSelect(selectedAnswer || "")}
              >
                Submit
              </button>
            )}
            {isAnswered && (
              <div className={c.answerFeedback}>
                <p
                  className={
                    selectedAnswer?.toLowerCase() ===
                    currentQuestion.answer.toLowerCase()
                      ? c.correct
                      : c.incorrect
                  }
                >
                  {selectedAnswer === currentQuestion.answer
                    ? "Correct!"
                    : `Incorrect. The answer is: ${currentQuestion.answer}`}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return <p>Unsupported question type.</p>;
    }
  };

  return (
    <div className="container headerPadding">
      <div className={c.quizHeader}>
        <h1>{data.name}</h1>
        <p>Category: {data.category.name}</p>
        <div className={c.progressIndicator}>
          Question {currentQuestionIndex + 1} of {data.questions.length}
        </div>
      </div>

      <div className={c.questionContainer}>
        <h2 className={c.questionText}>{currentQuestion.text}</h2>
        {renderQuestionOptions()}
      </div>

      {isAnswered && (
        <div className={c.navigationContainer}>
          <button className={c.nextButton} onClick={handleNextQuestion}>
            {currentQuestionIndex < data.questions.length - 1
              ? "Next Question"
              : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}
