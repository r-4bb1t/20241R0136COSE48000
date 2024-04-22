export const POST = async (req: Request) => {
  const { title, content, summary } = await req.json();
  await fetch(`${process.env.API_HOST}/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, summary }),
  });

  return {
    status: 200,
  };
};

export const GET = async (req: Request) => {
  const res = await fetch(`${process.env.API_HOST}/course`, {
    next: {
      tags: ["course-list"],
    },
  });
  const data = await res.json();

  return Response.json(
    data.map(
      (item: {
        content: string;
        id: number;
        timestamp: string;
        user_id: number;
        course_name: string;
        summary: string;
      }) => ({
        id: `${item.id}`,
        title: item.course_name,
        content: item.content,
      }),
    ),
  );
};
