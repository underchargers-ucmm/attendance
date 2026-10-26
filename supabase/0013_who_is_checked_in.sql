













create view who_is_checked_in as
select
  a.employee_id,
  e.name,
  e.position,
  a.check_in_at
from attendance a
join employees e on e.id = a.employee_id
where a.check_out_at is null;

grant select on who_is_checked_in to authenticated;
