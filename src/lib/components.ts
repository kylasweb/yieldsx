import { supabase } from "./supabase";

export interface Component {
  id: string;
  name: string;
  type: string;
  description: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export async function getComponents(): Promise<Component[]> {
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching components:", error);
    return [];
  }

  return data || [];
}

export async function getComponentsByType(type: string): Promise<Component[]> {
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("type", type)
    .order("name");

  if (error) {
    console.error(`Error fetching ${type} components:`, error);
    return [];
  }

  return data || [];
}

export async function getComponent(id: string): Promise<Component | null> {
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching component:", error);
    return null;
  }

  return data;
}

export async function createComponent(
  component: Omit<Component, "id" | "created_at" | "updated_at">,
): Promise<Component | null> {
  const { data, error } = await supabase
    .from("components")
    .insert([component])
    .select()
    .single();

  if (error) {
    console.error("Error creating component:", error);
    return null;
  }

  return data;
}

export async function updateComponent(
  id: string,
  updates: Partial<Omit<Component, "id" | "created_at" | "updated_at">>,
): Promise<Component | null> {
  const { data, error } = await supabase
    .from("components")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating component:", error);
    return null;
  }

  return data;
}

export async function deleteComponent(id: string): Promise<boolean> {
  const { error } = await supabase.from("components").delete().eq("id", id);

  if (error) {
    console.error("Error deleting component:", error);
    return false;
  }

  return true;
}
