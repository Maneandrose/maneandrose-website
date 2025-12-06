import { supabaseServer } from "./supabaseServer";

export type ExtractedActor = {
  first_name: string;
  last_name: string;
  stage_name?: string | null;
  gender?: string | null;
  ethnicity?: string | null;
  playing_age_min?: number | null;
  playing_age_max?: number | null;
  location?: string | null;
  spotlight_link?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  website?: string | null;
  bio?: string | null;
  is_active?: boolean;
  // Extra rich data
  credits?: any;
  training?: any;
  skills?: any;
  media?: any;
};

type ParsedImportInput = {
  name: string;
  playingAge?: string | null;
  gender?: string | null;
  ethnicity?: string | null;
  height?: string | null;
  skills?: string[];
  credits?: {
    title: string;
    type?: string | null;
    role?: string | null;
    company?: string | null;
    director?: string | null;
    year?: number | null;
  }[];
};

async function callOpenAIForActorExtraction(rawText: string): Promise<ExtractedActor> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const systemPrompt = `
You are a casting data extraction assistant for a UK talent agency.
You will be given the full text or HTML of a Spotlight actor CV or profile.

Your job is to extract a structured JSON object with the following shape:

{
  "first_name": string,
  "last_name": string,
  "stage_name": string | null,
  "gender": string | null,
  "ethnicity": string | null,
  "playing_age_min": number | null,
  "playing_age_max": number | null,
  "location": string | null,
  "spotlight_link": string | null,
  "instagram": string | null,
  "tiktok": string | null,
  "website": string | null,
  "bio": string | null,
  "is_active": boolean,
  "credits": {
    "film": [ { "title": string, "role": string | null, "director": string | null, "company": string | null } ],
    "tv": [ ... ],
    "theatre": [ ... ],
    "commercial": [ ... ],
    "voice": [ ... ],
    "other": [ ... ]
  },
  "training": [ string ],
  "skills": [ string ],
  "media": [
    { "type": "showreel" | "voice" | "clip", "title": string | null, "url": string }
  ]
}

- If you are unsure about a field, set it to null (or [] for arrays).
- playing_age_min and playing_age_max should come from the "playing age" or similar range, not the real age.
- location should be the main base (e.g. "London", "London / Manchester").
- Only return JSON. No extra commentary.
`;

  const userPrompt = `
Here is the full text/HTML of the actor's Spotlight CV or profile:
---
${rawText}
---
Extract the JSON now.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
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

  if (!response.ok) {
    const text = await response.text();
    console.error("OpenAI error:", text);
    throw new Error("Failed to call OpenAI for actor extraction");
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response missing content");
  }

  // Try to parse content as JSON
  let parsed: ExtractedActor;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Some models may wrap JSON in markdown; try to salvage it
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("Failed to parse OpenAI JSON:", content);
      throw new Error("Failed to parse actor JSON");
    }
    parsed = JSON.parse(match[0]);
  }

  return parsed;
}

export async function importActorFromSpotlightHtml(html: string) {
  const extracted = await callOpenAIForActorExtraction(html);

  const supabase = supabaseServer();

  const first_name = extracted.first_name?.trim();
  const last_name = extracted.last_name?.trim();

  if (!first_name || !last_name) {
    throw new Error("Extracted data is missing first_name or last_name");
  }

  const slug = `${first_name}-${last_name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { credits, training, skills, media, ...actorCore } = extracted;

  // Flatten extra data into notes so it's not lost
  const extraNotesParts: string[] = [];

  if (training && Array.isArray(training) && training.length > 0) {
    extraNotesParts.push(`Training:\n${training.join("\n")}`);
  }

  if (skills && Array.isArray(skills) && skills.length > 0) {
    extraNotesParts.push(`Skills:\n${skills.join(", ")}`);
  }

  if (credits) {
    extraNotesParts.push(`Credits (raw JSON):\n${JSON.stringify(credits, null, 2)}`);
  }

  if (media && Array.isArray(media) && media.length > 0) {
    extraNotesParts.push(`Media (raw JSON):\n${JSON.stringify(media, null, 2)}`);
  }

  const extraNotes =
    extraNotesParts.length > 0
      ? `Imported from Spotlight:\n\n${extraNotesParts.join("\n\n")}`
      : null;

  const { error } = await supabase.from("actors").insert([
    {
      first_name,
      last_name,
      stage_name: actorCore.stage_name ?? null,
      role_type: actorCore.gender ? "Actor" : "Actor", // can adjust later
      gender: actorCore.gender ?? null,
      ethnicity: actorCore.ethnicity ?? null,
      playing_age_min: actorCore.playing_age_min ?? null,
      playing_age_max: actorCore.playing_age_max ?? null,
      location: actorCore.location ?? null,
      spotlight_link: actorCore.spotlight_link ?? null,
      instagram: actorCore.instagram ?? null,
      tiktok: actorCore.tiktok ?? null,
      website: actorCore.website ?? null,
      bio: actorCore.bio ?? null,
      is_active: actorCore.is_active ?? true,
      notes: extraNotes,
      slug,
    },
  ]);

  if (error) {
    console.error("Supabase insert error (importActorFromSpotlightHtml):", error);
    throw new Error("Failed to insert actor into Supabase");
  }

  return { slug, first_name, last_name };
}

// Prepare for Spotlight importer using parsed (already extracted) data.
export async function importActorFromParsedData(parsed: ParsedImportInput) {
  const supabase = supabaseServer();

  const [firstName = "", lastName = ""] = parsed.name
    .split(" ")
    .filter(Boolean);

  if (!firstName || !lastName) {
    throw new Error("Parsed data must include a full name (first and last).");
  }

  const slug = `${firstName}-${lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { data: actor, error: actorError } = await supabase
    .from("actors")
    .insert({
      first_name: firstName,
      last_name: lastName,
      role_type: "Actor",
      gender: parsed.gender ?? null,
      ethnicity: parsed.ethnicity ?? null,
      notes: parsed.height ? `Height: ${parsed.height}` : null,
      slug,
    })
    .select()
    .single();

  if (actorError || !actor) {
    throw actorError || new Error("Failed to insert actor");
  }

  // Insert related skills
  if (parsed.skills && parsed.skills.length > 0) {
    const skillRows = parsed.skills.map((skill) => ({
      actor_id: actor.id,
      skill,
    }));
    const { error: skillError } = await supabase.from("skills").insert(skillRows);
    if (skillError) {
      // best-effort rollback
      await supabase.from("actors").delete().eq("id", actor.id);
      throw skillError;
    }
  }

  // Insert related credits
  if (parsed.credits && parsed.credits.length > 0) {
    const creditRows = parsed.credits.map((credit) => ({
      actor_id: actor.id,
      title: credit.title,
      type: credit.type ?? null,
      role: credit.role ?? null,
      company: credit.company ?? null,
      director: credit.director ?? null,
      year: credit.year ?? null,
    }));
    const { error: creditError } = await supabase.from("credits").insert(creditRows);
    if (creditError) {
      await supabase.from("skills").delete().eq("actor_id", actor.id);
      await supabase.from("actors").delete().eq("id", actor.id);
      throw creditError;
    }
  }

  return actor;
}

