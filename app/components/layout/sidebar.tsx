import Link from "next/link";
import { BiFile } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";

const DUMMY = [
  {
    id: "dummy",
    title: "[보건자료처리] 기술통계 및 자료의 기초",
  },
];

export default function Sidebar() {
  return (
    <aside className="top-0 flex min-h-0 w-80 flex-col border-r">
      <h1 className="flex p-8 text-xl font-extrabold">서비스 이름</h1>
      <ul className="h-full w-full">
        {DUMMY.map((item) => (
          <li key={item.id}>
            <Link
              href={`/lecture/${item.id}`}
              className="flex cursor-pointer items-center gap-2 px-8 py-2 font-medium hover:bg-black/5"
            >
              <BiFile size={28} />
              <div className="line-clamp-1">{item.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="flex w-full items-center justify-center gap-2 border-t py-4 font-semibold hover:bg-black/5">
        <GrAddCircle />새 강의
      </button>
    </aside>
  );
}
