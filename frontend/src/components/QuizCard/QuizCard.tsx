import { Quiz } from "@/types/Quiz";
import c from "./quizCard.module.css";
import { useNavigate } from "react-router";
import { paths } from "@/router/paths";
import { useAuth } from "@/contexts";
import toast from "react-hot-toast";
type QuizCardProps = {
  quiz: Quiz;
};

export function QuizCard({ quiz }: QuizCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigateQuiz = (id: string) => {
    console.log(user);
    if (!user) {
      toast.error("You have to log in to participate in quiz");

      navigate(paths.login);

      return;
    }
    navigate(paths.quiz(id));
  };
  return (
    <div className={c.quizCard} onClick={() => handleNavigateQuiz(quiz.id)}>
      <p>{quiz.name}</p>
    </div>
  );
}
