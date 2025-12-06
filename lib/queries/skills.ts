import { supabaseServer } from "@/lib/supabaseServer";
import type { Database, Skill } from "@/lib/db/types";

type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];

export async function getSkillsByActor(actorId: string): Promise<Skill[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("skills").select("*").eq("actor_id", actorId);
  if (error) throw error;
  return data || [];
}

export async function addSkill(actorId: string, skill: Omit<SkillInsert, "actor_id">): Promise<Skill> {
  const supabase = supabaseServer();
  const payload: SkillInsert = { ...skill, actor_id: actorId };
  const { data: inserted, error } = await supabase.from("skills").insert(payload).select().single();
  if (error) throw error;
  return inserted;
}

