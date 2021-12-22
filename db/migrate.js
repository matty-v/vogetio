const postgres = require('postgres');
const path = require('path');
const fs = require('fs');

const runMigrations = async (dbConnection) => {

  const sql = postgres(dbConnection, { onnotice: () => {}});

  const migrationInitSql = path.join(__dirname, 'migrations/init/up.sql');

  console.log(`Running DB init script: ${migrationInitSql}`);

  await sql.file(migrationInitSql, []);

  const [lastMigrationQueryResult] = await sql`
    select
      lastMigration,
      timeApplied
    from internal.migrations
  `

  let lastMigration = '000000';
  if (!lastMigrationQueryResult) {
    console.log('Detected no migrations, applying all...');
  } else {
    lastMigration = lastMigrationQueryResult.lastmigration;
    console.log(`Last migration was [${lastMigration}] applied at ${lastMigrationQueryResult.timeapplied}`);
  }

  const migrations = fs.readdirSync(path.join(__dirname, 'migrations'), { withFileTypes: true })
    .filter((item) => item.isDirectory() && item.name > lastMigration && item.name !== 'init')
    .map((item) => item.name);
  migrations.sort();

  if (migrations.length === 0) {
    console.log('No new migrations to apply!');
  } else {
    for(const migration of migrations) {
      console.log(`Applying migration ${migration}`);
      await sql.file(path.join(__dirname, `migrations/${migration}/up.sql`), []);
      await sql`insert into internal.migrations ${ sql({ lastMigration: migration }, 'lastMigration') }`;
    }
    console.log('Successfully applied migrations!');
  }

  sql.end({ timeout: null });
};

(async () => {
  try {
    console.log(`Applying migrations on DB: ${process.env.DATABASE_URL}`);
    await runMigrations(process.env.DATABASE_URL);
    process.exit();
  } catch (e) {
    console.log('Error running migrations!');
    console.error(e);
    process.exit(1);
  }
})();
