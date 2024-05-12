import { QuestionType } from "@/app/types/course";
import Questions from "./questions";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.APP_HOST}/api/course/${id}/questions`);
  const data = await res.json();
  console.log(data);
  return data as Promise<QuestionType[]>;
};

export default async function QuestionsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const questions = await getData(id);
  return (
    <main className="h-full w-full">
      <Questions id={id} defaultQuestions={questions} />
    </main>
  );
}
