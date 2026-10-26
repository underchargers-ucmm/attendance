






drop policy "attendance_insert_own" on attendance;

create policy "attendance_insert_own"
  on attendance for insert
  with check (
    employee_id = auth.uid()
    and (select active from employees where id = auth.uid())
  );
