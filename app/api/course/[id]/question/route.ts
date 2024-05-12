export const POST = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  const { count } = await req.json();

  const res = await fetch(`${process.env.API_HOST}/course/${id}/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count: `${count}` }),
  });

  const data = await res.json();
  console.log(data);
  return Response.json(data);
};
