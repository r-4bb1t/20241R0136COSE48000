export const POST = async (req: Request) => {
  const { content, department, category } = await req.json();
  const res = await fetch(`${process.env.API_HOST}/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      department,
      category,
    }),
  });

  const data = await res.json();

  console.log(data.summaries);

  return Response.json({
    summary: data.summaries.join("\n\n"),
  });
};
