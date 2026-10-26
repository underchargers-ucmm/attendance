import { supabase } from "@/services/supabase";
export function getAvatarPublicUrl(avatarPath: string): string {
  return supabase.storage.from("avatars").getPublicUrl(avatarPath).data
    .publicUrl;
}
