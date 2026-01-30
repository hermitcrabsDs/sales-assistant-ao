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

    // 🔹 DUMMY AI RESPONSE (OpenAI baad me add karenge)
    return Response.json({
      insight: `
• Contact had recent interaction (email / note)
• Engagement level: Warm

Next Action:
→ Follow-up call within 24 hours
→ Share pricing / proposal if pending
      `
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
