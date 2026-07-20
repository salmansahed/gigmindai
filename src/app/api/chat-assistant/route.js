import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // AI System Context & Navigation Instructions
    const systemPrompt = {
      role: "system",
      content: `You are GigMind AI, the official intelligent assistant for the GigMind marketplace.
      Your job is to answer user questions, assist with site navigation, recommend budgets, and help users post custom gigs.

      Key Platform Navigation Links (Always format links as standard text or Markdown like [Post a Gig](/client/add-job)):
      - Login / Sign In: /auth/login
      - Post a Custom Gig: /client/add-job
      - Register / Sign Up: /auth/sign-up
      - Browse All Gigs/Jobs: /explore-jobs
      - About Us: /about
      - Contact Support: /contact-support

      Behavior Instructions:
      1. Keep answers clear, engaging, and concise.
      2. If a user asks how to do something, guide them step-by-step and provide the relevant page link.
      3. Remember previous context in the conversation history and give follow-up reasoning.
      4. Do not mention any dashboard or pages that do not exist.
      `,
    };

    // Groq API with Streaming support
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemPrompt, ...messages],
        stream: true, // Enables Streaming Responses
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Groq AI Stream connection failed" },
        { status: 500 },
      );
    }

    // Return Stream to Frontend
    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("❌ AI Chat Assistant Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
