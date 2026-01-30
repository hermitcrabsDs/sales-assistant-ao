export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contactId = searchParams.get("contactId");

  if (!contactId) {
    return Response.json({ error: "missing" }, { status: 400 });
  }

  return Response.json({
    insight: `✅ GET works. ContactId = ${contactId}`,
  });
}
