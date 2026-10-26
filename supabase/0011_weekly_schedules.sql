







create table weekly_schedules (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employees (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  is_day_off boolean not null default false,
  start_time text check (start_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  end_time text check (end_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  updated_at timestamptz not null default now(),
  unique (employee_id, day_of_week)
);

alter table weekly_schedules enable row level security;





create policy "weekly_schedules_select_own_or_admin"
  on weekly_schedules for select
  using (employee_id = auth.uid() or is_admin());

create policy "weekly_schedules_insert_own"
  on weekly_schedules for insert
  with check (employee_id = auth.uid());

create policy "weekly_schedules_update_own"
  on weekly_schedules for update
  using (employee_id = auth.uid())
  with check (employee_id = auth.uid());


grant select, insert, update on public.weekly_schedules to authenticated;
