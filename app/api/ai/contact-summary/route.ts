export async function POST(req: Request) {
  console.log("🔥 CONTACT SUMMARY API HIT");

  try {
    const raw = await req.text();
    console.log("🔥 RAW BODY:", raw);

    const body = raw ? JSON.parse(raw) : {};
    console.log("🔥 PARSED BODY:", body);

    const { contactId } = body;

    if (!contactId) {
      console.log("❌ Missing contactId");
      return Response.json(
        { error: "contactId is required" },
        { status: 400 }
      );
    }

    console.log("✅ contactId received:", contactId);

    return Response.json({
      insight: `✅ Dummy summary works!

Contact ID: ${contactId}
Status: Medium engagement
Next action: Follow up in 2 days`,
    });
  } catch (err: any) {
    console.error("❌ API ERROR:", err);

    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
