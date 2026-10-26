







create policy "locations_select_authenticated"
  on locations for select
  using (auth.uid() is not null);

create policy "locations_insert_admin_only"
  on locations for insert
  with check (is_admin());

create policy "locations_update_admin_only"
  on locations for update
  using (is_admin())
  with check (is_admin());

grant insert, update on public.locations to authenticated;
