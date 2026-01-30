export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstname, lastname, email } = body;

    if (!firstname || !lastname) {
      return Response.json(
        { error: "firstname and lastname are required" },
        { status: 400 }
      );
    }

    // 🔹 DUMMY RESPONSE
    return Response.json({
      message: "Contact created successfully (dummy)",
      contact: {
        id: "dummy-contact-123",
        firstname,
        lastname,
        email: email || null,
      }
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
