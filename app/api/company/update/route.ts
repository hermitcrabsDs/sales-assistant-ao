export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, properties } = body;

    if (!companyId || !properties) {
      return Response.json(
        { error: "companyId and properties are required" },
        { status: 400 }
      );
    }

    // 🔹 DUMMY RESPONSE
    return Response.json({
      message: "Company updated successfully (dummy)",
      companyId,
      updatedProperties: properties
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
