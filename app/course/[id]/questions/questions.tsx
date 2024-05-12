"use client";

import { QuestionType } from "@/app/types/course";
import Link from "next/link";
import { useCallback, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Question from "./question";

export default function QuestionPage({
  id,
  defaultQuestions,
}: {
  id: string;
  defaultQuestions: QuestionType[];
}) {
  const [count, setCount] = useState(1);
  const [questions, setQuestions] = useState<QuestionType[]>(defaultQuestions);
  const [questionLoading, setQuestionLoading] = useState(false);

  const handleMakeQuestion = useCallback(async () => {
    setQuestionLoading(true);
    try {
      const res = await fetch(`/api/course/${id}/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
        }),
      });
      const data = await res.json();
      setQuestions(
        data.map((d: { question: string; id: string }) => ({
          ...d,
          answer: "",
          advice: "",
        })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setQuestionLoading(false);
    }
  }, [count, id]);

  return (
    <>
      <header className="sticky top-0 z-30 flex justify-between border-b bg-base-100 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href={`/course/${id}`}
            className="font-regular btn btn-ghost btn-sm"
          >
            강의 자료
          </Link>
          <Link
            href={`/course/${id}/questions`}
            className="btn btn-ghost btn-sm font-extrabold"
          >
            연습 문제
          </Link>
        </div>
      </header>
      <div className="flex w-full flex-col gap-8 p-12">
        <div className="flex gap-4">
          <div className="shrink-0 text-lg font-bold">생성할 문제 수</div>
          <div className="flex">
            <button
              className="btn btn-square btn-outline btn-sm"
              disabled={count <= 1}
              onClick={() => {
                setCount((cnt) => cnt - 1);
              }}
            >
              <BiMinus />
            </button>
            <div className="flex w-20 items-center justify-center">
              {["", "조금", "보통", "많이"][count]}
            </div>
            <button
              className="btn btn-square btn-outline btn-sm"
              disabled={count >= 3}
              onClick={() => {
                setCount((cnt) => cnt + 1);
              }}
            >
              <BiPlus />
            </button>
          </div>
          <button
            className="btn btn-outline btn-sm"
            disabled={questionLoading}
            onClick={handleMakeQuestion}
          >
            {questionLoading ? (
              <div className="loading loading-sm"></div>
            ) : (
              "문제 생성"
            )}
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <Question
              courseId={id}
              key={index}
              index={index}
              question={question}
              setQuestions={setQuestions}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
