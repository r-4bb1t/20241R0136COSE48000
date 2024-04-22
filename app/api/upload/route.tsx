export const POST = async (req: Request) => {
  const formData = await req.formData();

  const res = await fetch(`${process.env.API_HOST}/upload-media`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return Response.json({
    transcript: data.map((d: string[]) => d[1]).join(""),
  });
};
