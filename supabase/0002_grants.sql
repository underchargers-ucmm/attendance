








grant usage on schema public to anon, authenticated;



grant select, update on public.employees to authenticated;
grant select on public.locations to anon, authenticated;
grant select, insert, update on public.attendance to authenticated;
grant select, insert, update, delete on public.tasks to authenticated;
