









alter table employees
  add column is_roaming boolean not null default false;






create or replace function prevent_non_avatar_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if is_admin() then
    return new;
  end if;
  if new.role is distinct from old.role
    or new.email is distinct from old.email
    or new.position is distinct from old.position
    or new.department is distinct from old.department
    or new.location_id is distinct from old.location_id
    or new.active is distinct from old.active
    or new.start_date is distinct from old.start_date
    or new.mobile_number is distinct from old.mobile_number
    or new.annual_leave_days is distinct from old.annual_leave_days
    or new.is_roaming is distinct from old.is_roaming
    or new.created_at is distinct from old.created_at
  then
    raise exception 'Employees may only update their own avatar_path and name.';
  end if;
  return new;
end;
$$;
