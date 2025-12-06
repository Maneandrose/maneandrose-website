// Generated typings for Supabase tables used in this project.
// Adjust as the schema evolves to stay in sync with the database.

export type Actor = {
  id: string;
  full_name: string;
  playing_age: string | null;
  gender: string | null;
  ethnicity: string | null;
  height: string | null;
  build: string | null;
  location: string | null;
  spotlight_link: string | null;
  instagram: string | null;
  website: string | null;
  notes: string | null;
  headshot_url: string | null;
  created_at: string | null;
};

export type Credit = {
  id: string;
  actor_id: string;
  category: string | null;
  production: string | null;
  role: string | null;
  director: string | null;
  year: number | null;
  notes: string | null;
};

export type Skill = {
  id: string;
  actor_id: string;
  skill: string;
};

export type ActorContact = {
  id: string;
  actor_id: string;
  type: string;
  value: string;
};

export type Database = {
  public: {
    Tables: {
      actors: {
        Row: Actor;
        Insert: Omit<Actor, "id" | "created_at"> & { id?: string; created_at?: string | null };
        Update: Partial<Actor>;
      };
      credits: {
        Row: Credit;
        Insert: Omit<Credit, "id"> & { id?: string };
        Update: Partial<Credit>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, "id"> & { id?: string };
        Update: Partial<Skill>;
      };
      actor_contacts: {
        Row: ActorContact;
        Insert: Omit<ActorContact, "id"> & { id?: string };
        Update: Partial<ActorContact>;
      };
    };
  };
};

