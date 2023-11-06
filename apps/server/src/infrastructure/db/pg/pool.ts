import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'best_driver_db',
  user: 'postgres',
  password: '123',
  max: 40,
});

export default pool;
