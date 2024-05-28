export const POST = async (
  req: Request,
  {
    params: { id, questionId },
  }: { params: { id: string; questionId: string } },
) => {
  const { answer } = await req.json();

  const res = await fetch(
    `${process.env.API_HOST}/course/${id}/question/${questionId}/advice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    },
  );

  const data = await res.json();
  return Response.json(data);
};
