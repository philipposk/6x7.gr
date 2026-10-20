-- Run once per Supabase project (SQL editor) to create a read-only login for the admin panel.
-- Pick a strong password, then set ADMIN_DB_URL_<PROJECT> =
--   postgresql://admin_ro.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
create role admin_ro login password 'CHANGE_ME' nosuperuser nocreatedb nocreaterole;
alter role admin_ro set default_transaction_read_only = on;
alter role admin_ro set statement_timeout = '15s';
grant usage on schema auth to admin_ro;
grant select on auth.users to admin_ro;
do $$ declare s text; begin
  for s in select nspname from pg_namespace
    where nspname not in ('pg_catalog','information_schema','pg_toast','auth','storage','realtime','vault','pgsodium','supabase_functions','supabase_migrations','graphql','graphql_public','net','cron','pgbouncer','extensions')
      and nspname not like 'pg_%'
  loop
    execute format('grant usage on schema %I to admin_ro', s);
    execute format('grant select on all tables in schema %I to admin_ro', s);
    execute format('alter default privileges in schema %I grant select on tables to admin_ro', s);
  end loop;
end $$;
-- RLS: admin_ro needs to bypass RLS to see all users' rows:
alter role admin_ro bypassrls;  -- requires running as postgres; if refused, use the postgres pooler URL instead (read-only enforced by the app).
