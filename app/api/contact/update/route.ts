export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactId, properties } = body;

    if (!contactId || !properties) {
      return Response.json(
        { error: "contactId and properties are required" },
        { status: 400 }
      );
    }

    // 🔹 DUMMY RESPONSE
    return Response.json({
      message: "Contact updated successfully (dummy)",
      contactId,
      updatedProperties: properties
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
