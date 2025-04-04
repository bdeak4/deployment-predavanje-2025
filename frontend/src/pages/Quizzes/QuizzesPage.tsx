import useFetch from "@/hooks/useFetch";
import { fetchAllQuizzes } from "@/services/AuthService/quizzesService";
import { ClipLoader } from "react-spinners";
import c from "./quizzesPage.module.css";
import { Quiz } from "@/types/Quiz";
import { QuizCard } from "@/components";
import { useAuth } from "@/contexts";

export function QuizzesPage() {
  const { data, isLoading, error } = useFetch<Quiz[]>(fetchAllQuizzes);
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (error) throw new Error(error);

  if (!data || data.length === 0) {
    return (
      <div className="container">
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className={`container ${c.quizzesContainer}`}>
      <h1>Explore our quizzes: {user?.username}</h1>
      <div className={c.quizCardsWrapper}>
        {data.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
