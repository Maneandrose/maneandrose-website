module.exports = [
"[project]/lib/supabaseServer.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseServer",
    ()=>supabaseServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-rsc] (ecmascript)");
;
function supabaseServer() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])(("TURBOPACK compile-time value", "https://iakwafnjgvlimgvqmglz.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false
        }
    });
}
}),
"[project]/lib/actorImport.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "importActorFromSpotlightHtml",
    ()=>importActorFromSpotlightHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseServer.ts [app-rsc] (ecmascript)");
;
async function callOpenAIForActorExtraction(rawText) {
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt.trim()
                },
                {
                    role: "user",
                    content: userPrompt.trim()
                }
            ],
            temperature: 0.1
        })
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
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
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
async function importActorFromSpotlightHtml(html) {
    const extracted = await callOpenAIForActorExtraction(html);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseServer"])();
    const first_name = extracted.first_name?.trim();
    const last_name = extracted.last_name?.trim();
    if (!first_name || !last_name) {
        throw new Error("Extracted data is missing first_name or last_name");
    }
    const slug = `${first_name}-${last_name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const { credits, training, skills, media, ...actorCore } = extracted;
    // Flatten extra data into notes so it's not lost
    const extraNotesParts = [];
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
    const extraNotes = extraNotesParts.length > 0 ? `Imported from Spotlight:\n\n${extraNotesParts.join("\n\n")}` : null;
    const { error } = await supabase.from("actors").insert([
        {
            first_name,
            last_name,
            stage_name: actorCore.stage_name ?? null,
            role_type: actorCore.gender ? "Actor" : "Actor",
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
            slug
        }
    ]);
    if (error) {
        console.error("Supabase insert error (importActorFromSpotlightHtml):", error);
        throw new Error("Failed to insert actor into Supabase");
    }
    return {
        slug,
        first_name,
        last_name
    };
}
}),
"[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a9347bf028218f3638bb2af4947751c31b6cb6bf":"importFromSpotlightUrl","40e2371a057bc2a433e202e4049429047023ae8c6b":"uploadSpotlightPdf"},"",""] */ __turbopack_context__.s([
    "importFromSpotlightUrl",
    ()=>importFromSpotlightUrl,
    "uploadSpotlightPdf",
    ()=>uploadSpotlightPdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actorImport$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actorImport.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function importFromSpotlightUrl(formData) {
    const url = formData.get("spotlight_url")?.trim();
    if (!url) {
        throw new Error("Spotlight URL is required");
    }
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Failed to fetch Spotlight URL:", url, response.status);
        throw new Error("Could not fetch Spotlight page");
    }
    const html = await response.text();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actorImport$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importActorFromSpotlightHtml"])(html);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/actors?import=success");
}
async function uploadSpotlightPdf(formData) {
    const file = formData.get("spotlight_pdf");
    if (!file) {
        throw new Error("No file uploaded");
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseServer"])();
    const arrayBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(arrayBuffer);
    const fileName = `spotlight-cvs/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("documents").upload(fileName, fileBytes, {
        contentType: file.type || "application/pdf"
    });
    if (error) {
        console.error("Error uploading Spotlight CV PDF:", error);
        throw new Error("Failed to upload Spotlight CV");
    }
    // For now, just redirect with a notice.
    // Later we will hook in PDF parsing + extraction.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/actors?pdf_uploaded=1");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    importFromSpotlightUrl,
    uploadSpotlightPdf
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importFromSpotlightUrl, "40a9347bf028218f3638bb2af4947751c31b6cb6bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadSpotlightPdf, "40e2371a057bc2a433e202e4049429047023ae8c6b", null);
}),
"[project]/.next-internal/server/app/admin/actors/import/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$actors$2f$import$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/admin/actors/import/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40a9347bf028218f3638bb2af4947751c31b6cb6bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$actors$2f$import$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importFromSpotlightUrl"],
    "40e2371a057bc2a433e202e4049429047023ae8c6b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$actors$2f$import$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadSpotlightPdf"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$actors$2f$import$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$admin$2f$actors$2f$import$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/actors/import/page/actions.js { ACTIONS_MODULE0 => "[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$actors$2f$import$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/actors/import/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_5014e69e._.js.map