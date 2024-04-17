import Link from "next/link";
import { BiCheck, BiDownload, BiMicrophone } from "react-icons/bi";

export default function Lecture({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main className="h-full w-full">
      <header className="flex gap-6 border-b px-6 py-4">
        <Link href={`/lecture/${id}`} className="btn btn-sm btn-ghost">
          강의 자료
        </Link>
        <Link
          href={`/lecture/${id}/questions`}
          className="btn btn-sm btn-ghost"
        >
          연습 문제
        </Link>
      </header>
      <div className="flex w-full flex-col gap-8 p-12">
        <div className="flex items-center gap-4">
          <div className="shrink-0 text-lg font-bold">제목</div>
          <input className="input input-bordered input-sm w-full" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="shrink-0 text-lg font-bold">강의 필기</div>
            <label className="btn btn-sm btn-outline">
              <BiMicrophone /> 녹음본에서 불러오기
              <input type="file" className="hidden" accept="audio/*" />
            </label>
          </div>
          <textarea className="textarea textarea-bordered h-96 resize-none" />
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
          <textarea className="textarea textarea-bordered h-96 resize-none" />
        </div>
      </div>
    </main>
  );
}
