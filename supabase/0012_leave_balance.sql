








alter table employees
  add column annual_leave_days integer not null default 15 check (annual_leave_days >= 0);





