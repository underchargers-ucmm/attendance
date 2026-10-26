import { supabase } from "@/services/supabase";
import type { Employee } from "@/types/database";
import type { SignInInput, SignUpInput } from "../types";
export async function signIn({ email, password }: SignInInput) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}
export async function signUp({ name, email, password }: SignUpInput): Promise<{
  needsEmailConfirmation: boolean;
}> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw error;
  return { needsEmailConfirmation: !data.session };
}
export async function sendPasswordReset(email: string): Promise<void> {
  const adminWebUrl = process.env.EXPO_PUBLIC_ADMIN_WEB_URL;
  if (!adminWebUrl)
    throw new Error(
      "Password reset is not configured (EXPO_PUBLIC_ADMIN_WEB_URL is missing).",
    );
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${adminWebUrl}/reset-password`,
  });
  if (error) throw error;
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export async function fetchProfile(userId: string): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data as Employee;
}
