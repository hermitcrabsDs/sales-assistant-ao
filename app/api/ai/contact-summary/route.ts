export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactId } = body || {};

    if (!contactId) {
      return Response.json(
        { error: "contactId is required" },
        { status: 400 }
      );
    }

    // ✅ DUMMY RESPONSE (no HubSpot, no OpenAI)
    return Response.json({
      insight: `
🧪 Dummy AI Contact Summary

• Contact ID: ${contactId}
• Last activity: Email sent
• Engagement level: Medium

👉 Next best action:
Follow up with a call in 2–3 days.
      `.trim(),
    });

  } catch (err: any) {
    console.error("Dummy API error:", err);

    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
