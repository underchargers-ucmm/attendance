




alter table attendance
  add column is_late boolean not null default false,
  add column left_early boolean not null default false;
