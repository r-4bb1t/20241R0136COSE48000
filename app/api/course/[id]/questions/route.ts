export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  const res = await fetch(`${process.env.API_HOST}/course/${id}/questions`, {
    cache: "no-store",
  });
  const data = await res.json();
  return Response.json(data);
};
