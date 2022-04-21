import path from 'path';
import { DataSource } from 'typeorm';
import * as config from '../../../config';

const MARIA_DB = 'mariadb';
const { NODE_ENV } = process.env;
const TEST_DATABASE = 'goback_test';

export const dataSource = new DataSource({
  type: MARIA_DB,
  database: NODE_ENV === 'test' ? TEST_DATABASE : config.dbConfig.database,
  username: config.dbConfig.username,
  password: config.dbConfig.password,
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  charset: 'utf8mb4',
  synchronize: NODE_ENV === ('test' || 'local') ? true : false,
  entities: [path.join(__dirname, './entity/**/*.{ts,js}')],
});
