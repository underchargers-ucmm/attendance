





grant delete on public.attendance to authenticated;

create policy "attendance_delete_admin_only"
  on attendance for delete
  using (is_admin());
