import OpenAI from "openai";
import { HubSpotClient } from "@/lib/hubspot-client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { contactId } = await req.json();

    if (!contactId) {
      return Response.json(
        { error: "contactId is required" },
        { status: 400 }
      );
    }

    const hubspot = new HubSpotClient(
      process.env.HUBSPOT_ACCESS_TOKEN
    );

    // Reuse recent engagements (contact-linked)
    const engagements = await hubspot.getRecentEngagements(14, 30);

    const prompt = `
You are a CRM sales assistant.
Analyze the recent activities related to a contact
and return:

1. Short summary (bullets)
2. Engagement level (Cold / Warm / Hot)
3. Next best follow-up action

Recent activities:
${JSON.stringify(engagements).slice(0, 8000)}
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
