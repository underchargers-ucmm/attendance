




alter table leave_requests
  add column attachment_path text,
  add column location_lat double precision,
  add column location_lng double precision,
  add column location_address text;






insert into storage.buckets (id, name, public)
values ('leave-attachments', 'leave-attachments', false)
on conflict (id) do nothing;


create policy "leave_attachment_insert_own"
  on storage.objects for insert
  with check (bucket_id = 'leave-attachments' and (storage.foldername(name))[1] = auth.uid()::text);






create policy "leave_attachment_select_own_or_admin"
  on storage.objects for select
  using (bucket_id = 'leave-attachments' and ((storage.foldername(name))[1] = auth.uid()::text or is_admin()));
