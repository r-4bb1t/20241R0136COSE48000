import Edit from "@/app/components/edit";
import { CourseType } from "@/app/types/course";
import { redirect } from "next/navigation";

const getData = async (id: string) => {
  try {
    const res = await fetch(`${process.env.APP_HOST}/api/course/${id}`);
    return (await res.json()) as Promise<CourseType>;
  } catch (e) {
    redirect("/");
  }
};

export default async function Course({
  params: { id },
}: {
  params: { id: string };
}) {
  const course = await getData(id);
  return (
    <main className="h-full w-full">
      <Edit defaultValue={course} />
    </main>
  );
}
