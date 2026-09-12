import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(express.static("public"));

app.get("/api/status", (_req, res) => {
  res.json({ online: true, ai: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "AI mode is not configured. Local commands still work." });
  }

  const message = String(req.body?.message || "").trim().slice(0, 4000);
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8) : [];
  if (!message) return res.status(400).json({ error: "Message is required." });

  const safeHistory = history
    .filter((item) => item && ["user", "assistant"].includes(item.role))
    .map((item) => ({ role: item.role, content: String(item.content || "").slice(0, 2000) }));

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.45,
        max_tokens: 450,
        messages: [
          {
            role: "system",
            content: "You are A.R.C., a concise, calm, capable cinematic computer assistant. Use polished British phrasing without impersonating any real actor or copyrighted character. Be practical, honest about limitations, and never claim an action succeeded unless the app confirms it."
          },
          ...safeHistory,
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "AI request failed");
    res.json({ reply: data.choices?.[0]?.message?.content?.trim() || "No response received." });
  } catch (error) {
    res.status(502).json({ error: error.message || "AI service unavailable." });
  }
});

app.listen(port, () => console.log(`A.R.C. online at http://localhost:${port}`));
