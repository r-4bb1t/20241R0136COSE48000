"use client";

import { QuestionType } from "@/app/types/course";
import { useState } from "react";

export default function Question({
  courseId,
  index,
  question,
  setQuestions,
}: {
  courseId: string;
  index: number;
  question: QuestionType;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}) {
  const [adviceLoading, setAdviceLoading] = useState(false);

  const getAdvice = async () => {
    setAdviceLoading(true);
    try {
      const res = await fetch(
        `/api/course/${courseId}/question/${question.id}/advice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer: question.answer }),
        },
      );
      const data = await res.json();
      setQuestions((qs) =>
        qs.map((q, i) => (i === index ? { ...q, advice: data.advice } : q)),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setAdviceLoading(false);
    }
  };

  return (
    <li className="flex w-full flex-col gap-2">
      <div className="font-bold">
        {index + 1}. {question.question}
      </div>
      <textarea
        className="textarea textarea-bordered resize-none"
        value={question.answer}
        onChange={(e) => {
          setQuestions((qs) =>
            qs.map((q, i) =>
              i === index ? { ...q, answer: e.target.value } : q,
            ),
          );
        }}
      ></textarea>
      <button
        className="btn btn-outline btn-sm w-fit"
        onClick={getAdvice}
        disabled={adviceLoading}
      >
        {adviceLoading ? <div className="loading" /> : "첨삭"}
      </button>
      {question.advice && (
        <div className="bg-black/10 p-2 text-sm">{question.advice}</div>
      )}
    </li>
  );
}
