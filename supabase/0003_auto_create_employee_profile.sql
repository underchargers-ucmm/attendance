












create function handle_new_employee()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.employees (id, name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', new.email), new.email, 'employee');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_employee();

drop policy "employees_insert_self_as_employee" on employees;
