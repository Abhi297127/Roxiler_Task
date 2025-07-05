import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'security',
  database: 'rating_app',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
