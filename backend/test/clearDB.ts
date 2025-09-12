import { createDataSource } from '../src/db/data-source';

export async function clearDB() {
  const client = createDataSource();
  await client.initialize();

  try {
    const data = await client.query(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`,
    );

    const tableNames = data.map((row) => row.tablename);
    const tablesToTruncate = tableNames.filter(
      (t) => t !== 'migrations' && t !== 'typeorm_metadata',
    );

    await client.query('SET session_replication_role = replica;');

    for (const table of tablesToTruncate) {
      await client.query(`TRUNCATE TABLE "${table}" CASCADE`);
    }

    await client.query('SET session_replication_role = DEFAULT;');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  } finally {
    await client.destroy();
  }
}

if (process.argv.includes('--script-mode')) {
  clearDB().catch((error) => {
    console.error('Error executing clearDB:', error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
}
