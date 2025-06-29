import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

let dataSource: DataSource;

export const createDataSource = (options: any = undefined): DataSource => {
  if (dataSource) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migrations',
    retryAttempts: 3,
    ssl: {
      rejectUnauthorized: false,
    },
    migrationsTransactionMode: 'each',
    logging:
      process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    ...options,
  });

  return dataSource;
};

export default createDataSource();
