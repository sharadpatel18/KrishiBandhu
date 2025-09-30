import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // free trial key
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.text || "";

    const completion = await client.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: lastMessage }],
      temperature: 0.7,
    });

    const aiResponse = completion.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ text: aiResponse });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { text: "Error generating response. Please try again later." },
      { status: 500 }
    );
  }
}
