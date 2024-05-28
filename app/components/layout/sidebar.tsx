import { CourseType } from "@/app/types/course";
import Link from "next/link";
import { BiFile } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.APP_HOST}/api/course`, {
      next: {
        tags: ["course-list"],
      },
    });
    return (await res.json()) as Promise<CourseType[]>;
  } catch (e) {
    return [];
  }
};

export default async function Sidebar() {
  const courses = await getData();
  return (
    <aside className="sticky top-0 flex h-screen min-h-0 w-80 flex-col border-r">
      <div className="px-8 py-4">
        <Link href={"/"} className="btn btn-ghost text-xl font-extrabold">
          동기
        </Link>
      </div>
      <ul className="h-full w-full">
        {courses.length > 0 ? (
          courses.map((item) => (
            <li key={item.id}>
              <Link
                href={`/course/${item.id}`}
                className="flex cursor-pointer items-center gap-2 px-8 py-2 font-medium hover:bg-black/5"
              >
                <BiFile size={28} />
                <div className="line-clamp-1">{item.title}</div>
              </Link>
            </li>
          ))
        ) : (
          <div className="flex w-full justify-center">
            아직 등록된 강의가 없습니다.
          </div>
        )}
      </ul>
      <Link
        href={"/new"}
        className="flex w-full items-center justify-center gap-2 border-t py-4 font-semibold hover:bg-black/5"
      >
        <GrAddCircle />새 강의노트
      </Link>
    </aside>
  );
}
