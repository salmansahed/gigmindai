import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      title,
      tone = "professional",
      length = "medium",
    } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing in .env.local!" },
        { status: 500 },
      );
    }

    // Dynamic length prompt configuration
    const lengthInstruction =
      length === "short"
        ? "Keep the description concise (1 short paragraph)."
        : length === "long"
          ? "Provide a highly detailed description with 3 rich paragraphs."
          : "Provide a balanced 2-paragraph description.";

    const prompt = `
      You are an expert HR assistant writing a freelance job post.
      Job Title: "${title}"
      Writing Tone: ${tone}
      Length Requirement: ${lengthInstruction}

      Return ONLY a valid raw JSON object matching this schema (NO markdown formatting, NO \`\`\`json block, JUST raw JSON):
      {
        "description": "The job description based on the requested tone and length.",
        "category": "Frontend",
        "skills": ["Skill1", "Skill2", "Skill3"],
        "deliverables": ["Deliverable 1", "Deliverable 2"]
      }

      Note: 'category' MUST be strictly one of these values: ["Frontend", "Backend", "Full Stack", "AI & ML", "Design"].
    `;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Groq API Error:", data);
      return NextResponse.json(
        { error: data?.error?.message || "Groq API Request Failed" },
        { status: 500 },
      );
    }

    const parsedData = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("❌ Catch Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse AI output" },
      { status: 500 },
    );
  }
}
