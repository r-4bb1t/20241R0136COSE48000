"use client";

import { QuestionType } from "@/app/types/course";
import { useState } from "react";
import { BsRobot } from "react-icons/bs";

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
        className="textarea textarea-bordered h-32 resize-none"
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
        {adviceLoading ? <div className="loading loading-sm" /> : "제출"}
      </button>
      {question.advice && (
        <div className="bg-black/10 px-3 py-2 text-sm">
          <div className="mb-1 flex items-center gap-1 text-sm font-bold">
            <BsRobot /> AI의 첨삭
          </div>
          {question.advice.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </li>
  );
}
