




alter table locations
  add column expected_start text not null default '09:00' check (expected_start ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  add column expected_end text not null default '18:00' check (expected_end ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$');
