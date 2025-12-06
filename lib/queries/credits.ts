import { supabaseServer } from "@/lib/supabaseServer";
import type { Database, Credit } from "@/lib/db/types";

type CreditInsert = Database["public"]["Tables"]["credits"]["Insert"];

export async function getCreditsByActor(actorId: string): Promise<Credit[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("credits").select("*").eq("actor_id", actorId).order("year", {
    ascending: false,
  });
  if (error) throw error;
  return data || [];
}

export async function addCredit(actorId: string, data: Omit<CreditInsert, "actor_id">): Promise<Credit> {
  const supabase = supabaseServer();
  const payload: CreditInsert = { ...data, actor_id: actorId };
  const { data: inserted, error } = await supabase.from("credits").insert(payload).select().single();
  if (error) throw error;
  return inserted;
}

