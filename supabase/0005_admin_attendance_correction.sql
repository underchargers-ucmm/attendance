





alter table attendance drop constraint attendance_check_out_type_check;
alter table attendance add constraint attendance_check_out_type_check
  check (check_out_type in ('manual', 'auto_geofence', 'admin_correction'));

create policy "attendance_update_admin"
  on attendance for update
  using (is_admin())
  with check (is_admin());
