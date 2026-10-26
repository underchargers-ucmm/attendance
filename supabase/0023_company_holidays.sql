



















create table holidays (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  date date not null unique,
  created_at timestamptz not null default now()
);

alter table holidays enable row level security;

create policy "holidays_select_authenticated"
  on holidays for select
  using (auth.uid() is not null);

create policy "holidays_insert_admin_only"
  on holidays for insert
  with check (is_admin());

create policy "holidays_update_admin_only"
  on holidays for update
  using (is_admin())
  with check (is_admin());

create policy "holidays_delete_admin_only"
  on holidays for delete
  using (is_admin());

grant select, insert, update, delete on public.holidays to authenticated;

create index holidays_date_idx on holidays (date);
