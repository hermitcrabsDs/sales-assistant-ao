export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { contactId } = await req.json();

    if (!contactId) {
      return Response.json(
        { error: "contactId is required" },
        { status: 400 }
      );
    }

    const hubspot = new HubSpotClient(...);
    const activities = await hubspot.getCompanyActivity(contactId);

    const res = await openai.chat.completions.create(...);

    return Response.json({
      insight: res.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
  }
}
