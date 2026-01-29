import OpenAI from "openai";
import { HubSpotClient } from "@/lib/hubspot-client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    if (!companyId) {
      return Response.json(
        { error: "companyId is required" },
        { status: 400 }
      );
    }

    const hubspot = new HubSpotClient(
      process.env.HUBSPOT_ACCESS_TOKEN
    );

    const activities = await hubspot.getCompanyActivity(companyId);

    const prompt = `
You are an expert sales assistant.
Analyze the company activity below and return:

1. Short summary (2-3 bullets)
2. Risk level (Low / Medium / High)
3. Next best action

Company activity:
${JSON.stringify(activities).slice(0, 8000)}
`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return Response.json({
      insight: res.choices[0].message.content,
    });
  } catch (err: any) {
    console.error(err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
