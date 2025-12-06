"use server";

import { importActorFromParsedData, type ParsedActor } from "@/lib/queries/actors";
import { redirect } from "next/navigation";

function extractJson(content: string): any {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Unable to parse JSON from OpenAI response");
    return JSON.parse(match[0]);
  }
}

export async function importFromSpotlightUrl(formData: FormData) {
  const spotlightUrl = (formData.get("spotlight_url") as string)?.trim();
  if (!spotlightUrl) {
    throw new Error("Spotlight URL is required");
  }

  try {
    const pageRes = await fetch(spotlightUrl);
    if (!pageRes.ok) {
      console.error("Failed to fetch Spotlight URL:", spotlightUrl, pageRes.status);
      throw new Error("Fetch failed");
    }
    const html = await pageRes.text();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const systemPrompt = `
You are a data extraction assistant for a UK talent agency.
Input is a Spotlight actor profile HTML (or text).
Output must be STRICT JSON, no markdown, no commentary.
Shape:
{
  "name": "Full Name",
  "playingAge": "20-30",
  "gender": "Male/Female/Non-binary/Other or null",
  "ethnicity": "text or null",
  "height": "text or null",
  "build": "text or null",
  "location": "e.g. London / Manchester",
  "spotlightLink": "the spotlight URL if present",
  "instagram": "handle or url or null",
  "website": "url or null",
  "notes": "short summary or bio text or null",
  "skills": [ "skill 1", "skill 2", ... ],
  "credits": [
    {
      "category": "film|tv|stage|commercial|voice|other",
      "production": "Title of production",
      "role": "Role name or null",
      "director": "Director or null",
      "year": 2024
    }
  ]
}
- If a field is unknown, set it to null or [].
- playingAge should be the playing age range, not real age.
`;

    const userPrompt = `
Here is the full Spotlight page HTML/text:
---
${html}
---
Return ONLY JSON.
`;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt.trim() },
          { role: "user", content: userPrompt.trim() },
        ],
        temperature: 0.1,
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error("OpenAI error:", text);
      throw new Error("OpenAI request failed");
    }

    const aiJson = await aiRes.json();
    const content = aiJson.choices?.[0]?.message?.content;
    if (!content) throw new Error("OpenAI response missing content");

    const parsed = extractJson(content) as ParsedActor;

    await importActorFromParsedData({
      ...parsed,
      spotlightLink: parsed.spotlightLink ?? spotlightUrl,
    });

    redirect("/admin/actors?import=success");
  } catch (err) {
    console.error("Spotlight import failed:", err);
    throw new Error("Failed to import Spotlight profile");
  }
}

