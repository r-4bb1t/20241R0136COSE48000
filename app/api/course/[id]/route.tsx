export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  const res = await fetch(`${process.env.API_HOST}/course/${id}`, {
    next: {
      tags: [`course-${id}`],
    },
  });
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

export const PATCH = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  const { title, content, summary } = await req.json();
  console.log(title, content, summary);

  const res = await fetch(`${process.env.API_HOST}/course/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, summary }),
  });

  const data = await res.json();

  return Response.json({
    title: data.course_name,
    content: data.content,
    summary: data.summary,
  });
};
