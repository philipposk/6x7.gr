-- OPTIONAL, NOT applied. Nothing here is required for signup-source tracking:
-- apps already upsert into the existing public.app_access (PK user_id, app; RLS own rows).
-- This adds: (1) capture of signups that never log in (e.g. unconfirmed throwaways),
-- if an app passes options.data.signup_app on signUp/signInWithOtp; (2) a lookup index.
create or replace function public.record_signup_app() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.raw_user_meta_data ? 'signup_app' then
    insert into public.app_access(user_id, app, first_seen, last_seen)
    values (new.id, left(new.raw_user_meta_data->>'signup_app', 64), now(), now())
    on conflict (user_id, app) do nothing;
  end if;
  return new;
end $$;
drop trigger if exists on_auth_user_signup_app on auth.users;
create trigger on_auth_user_signup_app after insert on auth.users
  for each row execute function public.record_signup_app();
create index if not exists app_access_app_idx on public.app_access(app, first_seen);
-- Hardening worth doing too: anon currently has full grants on app_access (RLS still blocks it).
revoke all on public.app_access from anon;
