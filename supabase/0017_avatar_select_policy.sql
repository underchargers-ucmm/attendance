








create policy "avatar_select_all"
  on storage.objects for select
  using (bucket_id = 'avatars');
