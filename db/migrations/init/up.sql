DO $$
  BEGIN
    CREATE SCHEMA IF NOT EXISTS internal;

    CREATE TABLE IF NOT EXISTS internal.Migrations (
      lastMigration VARCHAR(255),
      timeApplied TIMESTAMP NOT NULL DEFAULT now()
    );
  END
$$;
