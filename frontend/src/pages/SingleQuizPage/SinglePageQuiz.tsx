import { useParams } from "react-router";

export function SinglePageQuiz() {
  const { id } = useParams<{ id: string }>();
  return <p>{id}</p>;
}
