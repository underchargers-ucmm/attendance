

alter table attendance
  add column day_type text not null default 'full' check (day_type in ('full', 'half'));
