















drop policy "leave_update_own_cancel_or_admin" on leave_requests;

create policy "leave_update_own_or_admin"
  on leave_requests for update
  using ((employee_id = auth.uid() and status in ('pending', 'approved')) or is_admin())
  with check ((employee_id = auth.uid() and status in ('pending', 'cancelled')) or is_admin());

grant delete on public.leave_requests to authenticated;





create policy "leave_delete_own_pending_or_cancelled_or_admin"
  on leave_requests for delete
  using (is_admin() or (employee_id = auth.uid() and status in ('pending', 'cancelled')));
