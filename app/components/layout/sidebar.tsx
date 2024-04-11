import { HiOutlineDocumentText } from "react-icons/hi";

export default function Sidebar() {
  return (
    <aside className="top-0 flex min-h-0 w-80 flex-col border-r">
      <h1 className="flex p-8 text-xl font-extrabold">서비스 이름</h1>
      <ul className="h-full w-full">
        <li className="flex cursor-pointer items-center gap-2 px-8 py-2 font-medium hover:bg-black/5">
          <HiOutlineDocumentText size={28} />
          <div className="line-clamp-1">
            [보건자료처리] 기술통계 및 자료의 기초
          </div>
        </li>
      </ul>
      <button className="w-full border-t py-4 font-semibold hover:bg-black/5">
        강의 음성 올리기
      </button>
    </aside>
  );
}
