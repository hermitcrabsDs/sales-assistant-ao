export async function POST(req: Request) {
  console.log("🔥 CONTACT SUMMARY API HIT");

  try {
    const rawBody = await req.text();
    console.log("🔥 RAW BODY:", rawBody);

    const body = rawBody ? JSON.parse(rawBody) : {};
    const { contactId } = body;

    if (!contactId) {
      return Response.json(
        { error: "contactId is required" },
        { status: 400 }
      );
    }

    // ✅ DUMMY RESPONSE (GUARANTEED NON-EMPTY)
    return Response.json({
      insight: `
🧪 Dummy AI Contact Summary

• Contact ID: ${contactId}
• Engagement: Medium
• Last activity: Email sent

👉 Next Action:
Follow up with a call in 2–3 days
      `.trim(),
    });

  } catch (err: any) {
    console.error("❌ API ERROR:", err);

    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
