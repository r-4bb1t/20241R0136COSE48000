export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  const res = await fetch(`${process.env.API_HOST}/course/${id}`);
  const data = await res.json();

  if (data.error) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }

  return Response.json({
    id: `${data.id}`,
    title: data.course_name,
    content: data.content,
  });
};
