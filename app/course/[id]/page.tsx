import Edit from "@/app/components/edit";
import { CourseType } from "@/app/types/course";

const getData = async (id: string) => {
  try {
    const res = await fetch(`${process.env.APP_HOST}/api/course/${id}`, {
      cache: "no-cache",
    });
    return (await res.json()) as Promise<CourseType>;
  } catch (e) {
    return null;
  }
};

export default async function Course({
  params: { id },
}: {
  params: { id: string };
}) {
  const course = await getData(id);
  if (!course) return null;
  return (
    <main className="h-full w-full">
      <Edit defaultValue={course} />
    </main>
  );
}
