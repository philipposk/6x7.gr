-- NOT applied yet. Stores 6x7.gr contact-form messages so /admin/contact can list them.
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  ip_hash text,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
-- No policies: only the service role (contact API) writes, only the admin read-only role reads.
revoke all on public.contact_messages from anon, authenticated;
