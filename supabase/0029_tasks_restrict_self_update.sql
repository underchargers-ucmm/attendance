







create function tasks_restrict_self_update()
returns trigger
language plpgsql
as $$
begin
  if is_admin() then
    return new;
  end if;

  if new.title is distinct from old.title
    or new.description is distinct from old.description
    or new.assigned_to is distinct from old.assigned_to
    or new.assigned_by is distinct from old.assigned_by
    or new.deadline is distinct from old.deadline
    or new.priority is distinct from old.priority
  then
    raise exception 'Only status and completed_at may be changed by the assignee.';
  end if;

  return new;
end;
$$;

create trigger tasks_restrict_self_update
  before update on tasks
  for each row execute function tasks_restrict_self_update();
