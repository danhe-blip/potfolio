import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Update these facts with your real info — this is what Claude answers from.
const SYSTEM = `You are a concise AI assistant embedded in a developer portfolio terminal.
Answer questions about the portfolio owner in 1-3 sentences. Be direct and conversational.
Respond in the same language the user writes in (Chinese or English).

Portfolio facts:
- Name: [UPDATE: your name]
- Role: Developer/designer who builds with AI agents as collaborators
- Projects: Soundboard experiment, this macOS-style portfolio, an agent tool, various weekend toys
- Work style: Uses Cursor + Claude Code, treats code like clay — shape and reshape iteratively
- Contact: Use the Chat (💬) window in the dock to leave a message, or find GitHub/X in the browser
- Location: [UPDATE: your city]
- Background: [UPDATE: brief background — e.g. "CS grad, 3 yrs at X, now indie"]

If asked something not covered above, say you don't have that info and suggest checking the links in the browser window.
Keep responses short — this is a terminal UI, not a chat app.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      system: SYSTEM,
      messages,
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error("[api/chat]", err.message);
    res.status(500).json({ error: "API error" });
  }
}
