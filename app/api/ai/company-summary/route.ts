export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    if (!companyId) {
      return Response.json(
        { error: "companyId is required" },
        { status: 400 }
      );
    }

    return Response.json({
      insight: `
• Company had recent engagement
• Follow-ups are pending

Risk Level: Medium

Next Action:
→ Schedule follow-up call
→ Share proposal
      `
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
