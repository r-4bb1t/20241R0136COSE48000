"use client";

import Link from "next/link";
import { BiCheck, BiDownload, BiMicrophone } from "react-icons/bi";
import { CourseType } from "../types/course";
import { useState } from "react";
import cc from "classcat";

export default function Edit({ defaultValue }: { defaultValue: CourseType }) {
  const [course, setCourse] = useState(defaultValue);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleSave = async () => {
    if (course.id) {
      await fetch(`/api/course/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
    } else {
      const res = await fetch(`/api/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const data = await res.json();
      setCourse(data);
    }
  };

  const handleUpload = async (file: File) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setCourse({ ...course, content: data.transcript });
    } catch (e) {
      console.error(e);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 flex justify-between border-b bg-base-100 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href={`/course/${course.id}`} className="btn btn-ghost btn-sm">
            강의 자료
          </Link>
          <Link
            href={`/course/${course.id}/questions`}
            className="btn btn-ghost btn-sm"
          >
            연습 문제
          </Link>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>
          저장
        </button>
      </header>
      <div className="flex w-full flex-col gap-8 p-12">
        <div className="flex items-center gap-4">
          <div className="shrink-0 text-lg font-bold">제목</div>
          <input
            className="input input-sm input-bordered w-full"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="shrink-0 text-lg font-bold">강의 필기</div>
            <label
              className={cc([
                "btn btn-outline btn-sm",
                uploadLoading && "btn-disabled",
              ])}
            >
              {uploadLoading ? (
                <div className="loading loading-xs" />
              ) : (
                <BiMicrophone />
              )}{" "}
              녹음본에서 불러오기
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0])
                    handleUpload(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <textarea
            className="textarea textarea-bordered h-96 resize-none"
            value={course.content}
            onChange={(e) => setCourse({ ...course, content: e.target.value })}
            disabled={uploadLoading}
          />
          <div className="flex w-full items-center justify-end gap-4">
            <button className="btn btn-ghost">
              파일로 저장하기
              <BiDownload />
            </button>
            <button className="btn btn-ghost">
              요약하기
              <BiCheck />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="shrink-0 text-lg font-bold">강의 요약</div>
          <textarea
            className="textarea textarea-bordered h-96 resize-none"
            value={course.summary}
            onChange={(e) => setCourse({ ...course, summary: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}
