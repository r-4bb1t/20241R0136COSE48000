"use client";

import Link from "next/link";
import { BiCheck, BiDownload, BiMicrophone } from "react-icons/bi";
import { CourseType } from "../types/course";
import { useEffect, useState } from "react";
import cc from "classcat";
import { revalidateTags } from "../actions/revalidate";
import { useRouter } from "next/navigation";
import Editor from "./editor";

export default function Edit({ defaultValue }: { defaultValue: CourseType }) {
  const [course, setCourse] = useState(defaultValue);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [saved, setSaved] = useState(defaultValue.id ? true : false);

  const router = useRouter();

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      if (course.id) {
        await fetch(`/api/course/${course.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...course,
          }),
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
        router.push(`/course/${data.id}`);
      }
      setSaved(true);
      try {
        revalidateTags(["course-list", `course-${course.id}`]);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      alert("저장에 실패했습니다.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("department", course.department);
      formData.append("category", course.category);

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

  const handleSummary = async () => {
    try {
      setSummaryLoading(true);
      const res = await fetch(`/api/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: course.content,
          department: course.department,
          category: course.category,
        }),
      });
      const data = await res.json();
      setCourse({ ...course, summary: data.summary });
      setSaved(false);
    } catch (e) {
      alert("요약에 실패했습니다.");
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex justify-between border-b bg-base-100 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href={`/course/${course.id}`}
            className="btn btn-ghost btn-sm font-extrabold"
          >
            강의 자료
          </Link>
          <button
            className="font-regular btn btn-ghost btn-sm"
            onClick={() => {
              if (course.id) router.push(`/course/${course.id}/questions`);
              else {
                handleSave();
              }
            }}
          >
            연습 문제
          </button>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSave}
          disabled={saveLoading || saved}
        >
          {saveLoading ? (
            <div className="loading loading-dots loading-sm" />
          ) : (
            "저장"
          )}
          {saved && (
            <>
              됨<BiCheck />
            </>
          )}
        </button>
      </header>
      <div className="flex w-full flex-col gap-8 p-12">
        <div className="flex items-center gap-4">
          <div className="shrink-0 text-lg font-bold">학과(부)</div>
          <input
            className="input input-sm input-bordered w-full"
            value={course.department}
            onChange={(e) => {
              setCourse({ ...course, department: e.target.value });
              setSaved(false);
            }}
          />
          <div className="shrink-0 text-lg font-bold">강의명</div>
          <input
            className="input input-sm input-bordered w-full"
            value={course.category}
            onChange={(e) => {
              setCourse({ ...course, category: e.target.value });
              setSaved(false);
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="shrink-0 text-lg font-bold">노트 제목</div>
          <input
            className="input input-sm input-bordered w-full"
            value={course.title}
            onChange={(e) => {
              setCourse({ ...course, title: e.target.value });
              setSaved(false);
            }}
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
              <BiMicrophone />
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
          <div className="relative h-full w-full">
            {uploadLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-base-100/70">
                <div className="loading" />
                <div>녹음본의 길이에 따라 시간이 소요될 수 있습니다.</div>
              </div>
            )}
            <Editor
              text={course.content}
              onChange={(value: string) => {
                setCourse({ ...course, content: value });
                setSaved(false);
              }}
              disabled={uploadLoading}
            />
          </div>
          <div className="flex w-full items-center justify-end gap-4">
            <button className="btn btn-ghost">
              파일로 저장하기
              <BiDownload />
            </button>
            <button
              className="btn btn-ghost"
              onClick={handleSummary}
              disabled={summaryLoading || uploadLoading}
            >
              요약하기
              <BiCheck />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="shrink-0 text-lg font-bold">강의 요약</div>
          <div className="relative h-full w-full">
            {summaryLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-base-100/70">
                <div className="loading" />
                <div>필기의 길이에 따라 시간이 소요될 수 있습니다.</div>
              </div>
            )}
            <Editor
              text={course.summary ?? ""}
              onChange={(value: string) => {
                setCourse({ ...course, summary: value });
                setSaved(false);
              }}
              disabled={summaryLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
