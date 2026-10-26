




grant delete on public.locations to authenticated;

create policy "locations_delete_admin_only"
  on locations for delete
  using (is_admin());
