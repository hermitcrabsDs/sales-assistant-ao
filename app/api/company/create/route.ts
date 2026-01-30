export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, properties } = body;

    if (!name) {
      return Response.json(
        { error: "company name is required" },
        { status: 400 }
      );
    }

    // 🔹 DUMMY RESPONSE
    return Response.json({
      message: "Company created successfully (dummy)",
      company: {
        id: "dummy-company-456",
        name,
        properties: properties || {}
      }
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
