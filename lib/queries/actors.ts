import { supabaseServer } from "@/lib/supabaseServer";
import type { Database, Actor } from "@/lib/db/types";

type ActorInsert = Database["public"]["Tables"]["actors"]["Insert"];
type ActorUpdate = Database["public"]["Tables"]["actors"]["Update"];

export type ParsedActor = {
  name: string;
  playingAge?: string | null;
  gender?: string | null;
  ethnicity?: string | null;
  height?: string | null;
  build?: string | null;
  location?: string | null;
  spotlightLink?: string | null;
  instagram?: string | null;
  website?: string | null;
  notes?: string | null;
  skills?: string[];
  credits?: {
    category?: string | null;
    production?: string | null;
    role?: string | null;
    director?: string | null;
    year?: number | null;
    notes?: string | null;
  }[];
};

export async function getAllActors(): Promise<Actor[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("actors").select("*").order("full_name", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getActorById(id: string): Promise<Actor | null> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("actors").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createActor(data: ActorInsert): Promise<Actor> {
  const supabase = supabaseServer();
  const { data: inserted, error } = await supabase.from("actors").insert(data).select().single();
  if (error) throw error;
  return inserted;
}

export async function updateActor(id: string, data: ActorUpdate): Promise<Actor> {
  const supabase = supabaseServer();
  const { data: updated, error } = await supabase.from("actors").update(data).eq("id", id).select().single();
  if (error) throw error;
  return updated;
}

export async function deleteActor(id: string): Promise<void> {
  const supabase = supabaseServer();
  const { error } = await supabase.from("actors").delete().eq("id", id);
  if (error) throw error;
}

export async function importActorFromParsedData(parsed: ParsedActor) {
  const supabase = supabaseServer();

  const fullName = parsed.name?.trim();
  if (!fullName) {
    throw new Error("Parsed actor must include a name");
  }

  const { data: actor, error: actorError } = await supabase
    .from("actors")
    .insert({
      full_name: fullName,
      playing_age: parsed.playingAge ?? null,
      gender: parsed.gender ?? null,
      ethnicity: parsed.ethnicity ?? null,
      height: parsed.height ?? null,
      build: parsed.build ?? null,
      location: parsed.location ?? null,
      spotlight_link: parsed.spotlightLink ?? null,
      instagram: parsed.instagram ?? null,
      website: parsed.website ?? null,
      notes: parsed.notes ?? null,
    })
    .select()
    .single();

  if (actorError || !actor) {
    throw actorError || new Error("Failed to insert actor");
  }

  // Insert skills
  if (parsed.skills && parsed.skills.length > 0) {
    const skillRows = parsed.skills.map((skill) => ({ actor_id: actor.id, skill }));
    const { error: skillError } = await supabase.from("skills").insert(skillRows);
    if (skillError) {
      await supabase.from("actors").delete().eq("id", actor.id);
      throw skillError;
    }
  }

  // Insert credits
  if (parsed.credits && parsed.credits.length > 0) {
    const creditRows = parsed.credits.map((credit) => ({
      actor_id: actor.id,
      category: credit.category ?? null,
      production: credit.production ?? null,
      role: credit.role ?? null,
      director: credit.director ?? null,
      year: credit.year ?? null,
      notes: credit.notes ?? null,
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

