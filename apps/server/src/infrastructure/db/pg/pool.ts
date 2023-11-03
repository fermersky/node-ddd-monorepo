import knex from 'knex';
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'best_driver_db',
  user: 'postgres',
  password: '123',
  max: 40,
});

console.log('connected to Postgres 🔥');

export default knex({
  client: 'pg',
  pool: {
    max: 40,
  },
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'best_driver_db',
    user: 'postgres',
    password: '123',
  },
});
